/**********************
 * Firebase (compat)
 **********************/
const firebaseConfig = {
  apiKey: "AIzaSyCYe3m5O6X1-q47u1w1GQ4bT8pAvJ5tzq8",
  authDomain: "tracollector.firebaseapp.com",
  databaseURL: "https://tracollector-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tracollector",
  storageBucket: "tracollector.firebasestorage.app",
  messagingSenderId: "520928034041",
  appId: "1:520928034041:web:1e5facfbe4ddb5e55e7628",
  measurementId: "G-YPW4TB6P51"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/**********************
 * Auth gate
 **********************/
firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  const allowedUID = "SUILZCLhDWWXJDQxizZKWPDms1a2";
  const allowedEmail = "lohwa@gmail.com";
  if (user.uid !== allowedUID && user.email !== allowedEmail) {
    window.location.href = "unauthorized.html";
    return;
  }

  try {
    const snap = await db.ref(`users/${user.uid}`).once("value");
    if (snap.exists()) {
      const { email } = snap.val();
      const el = document.getElementById("usernameDisplay");
      if (el) el.innerText = email || user.email || "User";
    }
  } catch (e) {
    console.error("Error fetching user data:", e);
  }
});

/**********************
 * DOM refs
 **********************/
const logoutBtn = document.getElementById("logoutButton");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    firebase.auth().signOut().then(() => (window.location.href = "index.html"));
  });
}

const paymentsTBody = document
  .getElementById("payments-table")
  ?.getElementsByTagName("tbody")[0];

const filterBtn = document.getElementById("filter");
const searchInput = document.getElementById("payment-search");

const startDateEl = document.getElementById("startDate");
const endDateEl = document.getElementById("endDate");

const totalTodayEl = document.getElementById("total-today");
const totalResiboEl = document.getElementById("total-resibo");
const eightEl = document.getElementById("eight");
const totalClaimedEl = document.getElementById("total-claimed");
const totalResiboClaimedEl = document.getElementById("total-resiboClaimed");
const eightCEl = document.getElementById("eightC");

const modalAssign = document.getElementById("edit-payment-formAssign");
const modalEdit = document.getElementById("edit-payment-form");
const btnCloseAssign = document.getElementById("cancel-editAssign");
const btnCloseEdit = document.getElementById("cancel-edit");
const btnSaveAssign = document.getElementById("save-editAssign");
const btnSaveEdit = document.getElementById("save-edit");

const editAmountInput = document.getElementById("edit-amount");
const editStatusInput = document.getElementById("edit-status");
const editPayIdInput = document.getElementById("edit-idPay");

const assignRefInput = document.getElementById("edit-ref-numberAssign");
const assignAmountInput = document.getElementById("edit-amountAssign");
const assignTimeInput = document.getElementById("timeEdit");
const assignNoteInput = document.getElementById("note");
const assignNickInput = document.getElementById("edit-merchantAssign");
const assignPayIdInput = document.getElementById("edit-idPayAssign");

/**********************
 * Helpers
 **********************/
function fmtDateISO(d) {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function setDefaultDates() {
  const today = new Date();
  const iso = fmtDateISO(today);
  if (startDateEl) startDateEl.value = iso;
  if (endDateEl) endDateEl.value = iso;
  const dateTodayHidden = document.getElementById("date-today");
  if (dateTodayHidden) dateTodayHidden.value = iso;
}
window.addEventListener("load", setDefaultDates);

/**********************
 * Payments table state
 **********************/
let activeQueryRef = null;                  // the active Firebase query for list streaming
const rowIndexById = new Map();             // paymentId -> <tr>
let currentRowsData = new Map();            // paymentId -> data (for searching)

/**
 * Build a single row and wire events.
 */
function buildRow(paymentId, p) {
  const tr = document.createElement("tr");

  const col = (text = "") => {
    const td = document.createElement("td");
    td.textContent = text ?? "";
    return td;
  };

  const idxTd = col(""); // will be filled after render
  const assignTd = document.createElement("td");
  const assignBtn = document.createElement("button");
  assignBtn.className = "edit-button-assign";
  assignBtn.textContent = "+";
  assignBtn.addEventListener("click", () => openAssignModal(paymentId, p));
  assignTd.appendChild(assignBtn);

  const amountTd = col(p.amount);
  const refTd = col(p.refNumber);
  const timeTd = col(p.time);
  const merchantTd = col(p.merchantP);
  const dateTd = col(p.date);
  const noteTd = col(p.note);
  const typeTd = col(p.paymentType);
  const userTd = col(p.user);
  const textTd = col(p.message);
  const saveTd = col(p.save);
  const deviceTd = col(p.device);
  const statusTd = col(p.status);
  const senderTd = col(p.sender);

  const tradeTd = document.createElement("td");
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.checked = p.status === "claimed";
  cb.addEventListener("change", async (ev) => {
    ev.stopPropagation();
    try {
      const newStatus = cb.checked ? "claimed" : "new";
      await db.ref(`payments/${paymentId}`).update({ status: newStatus });
      statusTd.textContent = newStatus;
      if (newStatus === "claimed") cb.disabled = true;
    } catch (e) {
      console.error("Update status failed:", e);
      cb.checked = !cb.checked; // revert
    }
  });
  tradeTd.appendChild(cb);

  const editTd = document.createElement("td");
  const editBtn = document.createElement("button");
  editBtn.className = "edit-button";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => openEditModal(paymentId, p));
  editTd.appendChild(editBtn);

  [
    idxTd, assignTd, amountTd, refTd, timeTd, merchantTd, dateTd, noteTd,
    typeTd, userTd, textTd, saveTd, deviceTd, statusTd, senderTd, tradeTd, editTd
  ].forEach(td => tr.appendChild(td));

  return tr;
}

/**
 * Rerender row numbers and totals after table changes.
 */
function recalcNumbersAndTotals() {
  if (!paymentsTBody) return;

  // Row numbers
  Array.from(paymentsTBody.rows).forEach((tr, idx) => {
    const firstTd = tr.cells[0];
    if (firstTd) firstTd.textContent = String(idx + 1);
  });

  // Totals (amount column is index 2)
  let total = 0;
  Array.from(paymentsTBody.rows).forEach(tr => {
    const amt = parseFloat(tr.cells[2]?.textContent || "0");
    if (!Number.isNaN(amt)) total += amt;
  });
  const totalCell = document.getElementById("table-total");
  if (totalCell) totalCell.textContent = total.toFixed(2);
}

/**
 * Insert/Update a single payment row (called by child_added / child_changed).
 */
/**
 * Insert/Update a single payment row (called by child_added / child_changed).
 */
function upsertPaymentRow(paymentId, data) {
  // cache current row data for searching
  currentRowsData.set(paymentId, data);

  let tr = rowIndexById.get(paymentId);
  if (!tr) {
    // create new row
    tr = buildRow(paymentId, data);
    if (paymentsTBody) {
      // insert at TOP instead of bottom
      if (paymentsTBody.firstChild) {
        paymentsTBody.insertBefore(tr, paymentsTBody.firstChild);
      } else {
        paymentsTBody.appendChild(tr);
      }
    }
    rowIndexById.set(paymentId, tr);
  } else {
    // Replace existing row to keep it simple and safe
    const newTr = buildRow(paymentId, data);
    paymentsTBody.replaceChild(newTr, tr);
    rowIndexById.set(paymentId, newTr);
  }

  recalcNumbersAndTotals();
}

/**
 * Remove a row (child_removed).
 */
function removePaymentRow(paymentId) {
  const tr = rowIndexById.get(paymentId);
  if (tr && tr.parentNode) {
    tr.parentNode.removeChild(tr);
  }
  rowIndexById.delete(paymentId);
  currentRowsData.delete(paymentId);
  recalcNumbersAndTotals();
}

/**********************
 * Querying: ONLY the date range, then filter status on client
 * (RTDB can't do two where clauses without a composite).
 **********************/
function attachPaymentsStream(startISO, endISO) {
  // Clean up previous listeners
  if (activeQueryRef) activeQueryRef.off();

  // Only query by date (requires indexOn: ["date"])
  const q = db
    .ref("payments")
    .orderByChild("date")
    .startAt(startISO)
    .endAt(endISO);

  // Save so we can .off() later
  activeQueryRef = q;

  // Clear table
  if (paymentsTBody) paymentsTBody.innerHTML = "";
  rowIndexById.clear();
  currentRowsData.clear();

  // Stream in small chunks (child events)
  q.on("child_added", (snap) => {
    const p = snap.val();
    const id = snap.key;
    if (!p) return;

    // Only render the fields we actually need to show
    // Filter status on client (since we already reduced to a date window)
    if (p.status === "new") {
      upsertPaymentRow(id, {
        amount: p.amount ?? "",
        refNumber: p.refNumber ?? "",
        time: p.time ?? "",
        merchantP: p.merchantP ?? "",
        date: p.date ?? "",
        note: p.note ?? "",
        paymentType: p.paymentType ?? "",
        user: p.user ?? "",
        message: p.message ?? "",
        save: p.save ?? "",
        device: p.device ?? "",
        status: p.status ?? "new",
        sender: p.sender ?? ""
      });
    }
  });

  q.on("child_changed", (snap) => {
    const p = snap.val();
    const id = snap.key;
    if (!p) return;

    // If status changed to something else, remove from current view
    if (p.status !== "new") {
      removePaymentRow(id);
      return;
    }
    upsertPaymentRow(id, {
      amount: p.amount ?? "",
      refNumber: p.refNumber ?? "",
      time: p.time ?? "",
      merchantP: p.merchantP ?? "",
      date: p.date ?? "",
      note: p.note ?? "",
      paymentType: p.paymentType ?? "",
      user: p.user ?? "",
      message: p.message ?? "",
      save: p.save ?? "",
      device: p.device ?? "",
      status: p.status ?? "new",
      sender: p.sender ?? ""
    });
  });

  q.on("child_removed", (snap) => {
    removePaymentRow(snap.key);
  });
}



document.getElementById("clear-payment-search").addEventListener("click", function () {
  const input = document.getElementById("payment-search");
  input.value = "";
  input.dispatchEvent(new Event("input")); // triggers your search function if you use input listener
});


/**********************
 * Filter button (date range)
 **********************/
async function filterPayments() {
  if (!startDateEl || !endDateEl) return;
  const startISO = startDateEl.value || fmtDateISO(new Date());
  const endISO = endDateEl.value || startISO;

  // Attach a streaming query to the selected window
  attachPaymentsStream(startISO, endISO);

  // Recompute quick totals for today / claimed using small queries
  computeTodayNewTotal();
  computeTodayClaimedTotal();
}

// initial load
document.addEventListener("DOMContentLoaded", filterPayments);
if (filterBtn) filterBtn.addEventListener("click", filterPayments);

/**********************
 * Search (client-side over *already streamed* rows)
 **********************/
if (searchInput) {
  let timer;
  searchInput.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const q = (searchInput.value || "").toLowerCase().trim();
      if (!paymentsTBody) return;

      // Simple filter: hide rows not matching
      Array.from(paymentsTBody.rows).forEach((tr) => {
        const id = Array.from(rowIndexById.entries()).find(([, el]) => el === tr)?.[0];
        const data = id ? currentRowsData.get(id) : null;
        if (!q || !data) {
          tr.style.display = "";
          return;
        }
        const hay =
          (String(data.amount) + " " +
           String(data.sender) + " " +
           String(data.refNumber) + " " +
           String(data.time) + " " +
           String(data.date) + " " +
           String(data.paymentType) + " " +
           String(data.save) + " " +
           String(data.merchantP))
            .toLowerCase();
        tr.style.display = hay.includes(q) ? "" : "none";
      });

      // Recalc totals on visible rows only
      let total = 0;
      Array.from(paymentsTBody.rows).forEach((tr) => {
        if (tr.style.display === "none") return;
        const amt = parseFloat(tr.cells[2]?.textContent || "0");
        if (!Number.isNaN(amt)) total += amt;
      });
      const totalCell = document.getElementById("table-total");
      if (totalCell) totalCell.textContent = total.toFixed(2);
    }, 250);
  });
}

/**********************
 * Quick aggregates (smaller queries)
 **********************/
async function computeTodayNewTotal() {
  try {
    const todayISO = (document.getElementById("date-today")?.value) || fmtDateISO(new Date());
    const q = db.ref("payments").orderByChild("date").startAt(todayISO).endAt(todayISO);
    const snap = await q.once("value");
    let count = 0, sum = 0;
     let countToday = 0, sumToday = 0;
    
    snap.forEach((child) => {
      const p = child.val();
      if (p?.date === todayISO && p?.status === "new") {
        count += 1;
        sum += parseFloat(p.amount || 0);
      
       
      }
     
      if (p?.date === todayISO) {
        countToday += 1;
        sumToday += parseFloat(p.amount || 0);
      
      }


    });
    if (totalTodayEl) totalTodayEl.value = sumToday.toFixed(2);
    if (totalResiboEl) totalResiboEl.value = String(count);
    if (eightEl) eightEl.value = (sumToday * 0.08).toFixed(2);
  } catch (e) {
    console.error("computeTodayNewTotal error:", e);
  }
}

async function computeTodayClaimedTotal() {
  try {
    const todayISO = (document.getElementById("date-today")?.value) || fmtDateISO(new Date());
    const q = db.ref("payments").orderByChild("date").startAt(todayISO).endAt(todayISO);
    const snap = await q.once("value");
    let count = 0, sum = 0;
    snap.forEach((child) => {
      const p = child.val();
      if (p?.date === todayISO && p?.status === "claimed") {
        count += 1;
        sum += parseFloat(p.amount || 0);
      }
    });
    if (totalClaimedEl) totalClaimedEl.value = sum.toFixed(2);
    if (totalResiboClaimedEl) totalResiboClaimedEl.value = String(count);
    if (eightCEl) eightCEl.value = (sum * 0.08).toFixed(2);
  } catch (e) {
    console.error("computeTodayClaimedTotal error:", e);
  }
}

/**********************
 * Edit & Assign modals (lightweight updates)
 **********************/
function openEditModal(paymentId, data) {
  if (!modalEdit) return;
  editPayIdInput.value = paymentId;
  if (editAmountInput) editAmountInput.value = data.amount ?? "";
  if (editStatusInput) editStatusInput.value = data.status ?? "";
  modalEdit.style.display = "block";
}

function openAssignModal(paymentId, data) {
  if (!modalAssign) return;
  assignPayIdInput.value = paymentId;
  assignAmountInput.value = data.amount ?? "";
  assignRefInput.value = data.refNumber ?? "";
  assignTimeInput.value = data.time ?? "";
  assignNoteInput.value = data.note ?? "";
  assignNickInput.value = data.merchantP ?? "";
  modalAssign.style.display = "block";
}

if (btnCloseEdit) btnCloseEdit.addEventListener("click", () => (modalEdit.style.display = "none"));
if (btnCloseAssign) btnCloseAssign.addEventListener("click", () => (modalAssign.style.display = "none"));

if (btnSaveEdit) {
  btnSaveEdit.addEventListener("click", async () => {
    try {
      const id = editPayIdInput.value;
      const payload = {
        amount: parseFloat(editAmountInput.value || "0"),
        status: (editStatusInput.value || "new")
      };
      await db.ref(`payments/${id}`).update(payload);
      Swal.fire({ title: "Saved", icon: "success", timer: 1500, showConfirmButton: false });
      modalEdit.style.display = "none";
    } catch (e) {
      console.error(e);
      Swal.fire({ title: "Error", text: String(e), icon: "error" });
    }
  });
}

if (btnSaveAssign) {
  btnSaveAssign.addEventListener("click", async () => {
    try {
      const id = assignPayIdInput.value;
      const payload = {
        amount: parseFloat(assignAmountInput.value || "0"),
        refNumber: assignRefInput.value || "",
        note: assignNoteInput.value || "",
        merchantP: assignNickInput.value || "",
       merchantKey: id

      };
      await db.ref(`payments/${id}`).update(payload);
      Swal.fire({ title: "Assigned", icon: "success", timer: 1500, showConfirmButton: false });
      modalAssign.style.display = "none";
    } catch (e) {
      console.error(e);
      Swal.fire({ title: "Error", text: String(e), icon: "error" });
    }
  });
}

/**********************
 * Merchant suggestions (kept lightweight)
 **********************/
const merchantInput = document.getElementById("edit-merchant");
const suggestionsList = document.getElementById("suggestionsList");
if (merchantInput && suggestionsList) {
  let t;
  merchantInput.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(async () => {
      const term = (merchantInput.value || "").toLowerCase();
      suggestionsList.innerHTML = "";
      if (!term) return;
      try {
        // requires indexOn: ["nameLower"]
        const snap = await db.ref("merchants")
          .orderByChild("nameLower")
          .startAt(term)
          .endAt(term + "\uf8ff")
          .limitToFirst(5)
          .once("value");

        snap.forEach(child => {
  const name = child.val()?.name;
  const key = child.key; // THIS is the Firebase key
  if (!name) return;
  const li = document.createElement("li");
  li.textContent = name;
  li.addEventListener("click", () => {
    merchantInputAssign.value = name;
    merchantInputAssign.dataset.key = key; // store key in a data attribute
    suggestionsListAssign.innerHTML = "";
  });
  suggestionsListAssign.appendChild(li);
});

      } catch (e) {
        console.error("Merchant suggest error:", e);
      }
    }, 200);
  });
}

const merchantInputAssign = document.getElementById("edit-merchantAssign");
const suggestionsListAssign = document.getElementById("suggestionsListAssign");
if (merchantInputAssign && suggestionsListAssign) {
  let t2;
  merchantInputAssign.addEventListener("input", () => {
    clearTimeout(t2);
    t2 = setTimeout(async () => {
      const term = (merchantInputAssign.value || "").toLowerCase();
      suggestionsListAssign.innerHTML = "";
      if (!term) return;
      try {
        const snap = await db.ref("merchants")
          .orderByChild("nameLower")
          .startAt(term)
          .endAt(term + "\uf8ff")
          .limitToFirst(5)
          .once("value");

        snap.forEach(child => {
          const name = child.val()?.name;
          if (!name) return;
          const li = document.createElement("li");
          li.textContent = name;
          li.addEventListener("click", () => {
            merchantInputAssign.value = name;
            suggestionsListAssign.innerHTML = "";
          });
          suggestionsListAssign.appendChild(li);
        });
      } catch (e) {
        console.error("Merchant suggest error:", e);
      }
    }, 200);
  });
}

/**********************
 * “Show Total” modal (kept as-is)
 **********************/
function toggleTableModal1() {
  const modal = document.getElementById("tableModal1");
  const iframe = document.getElementById("totalSentIframe");
  modal.style.display = "flex";
  iframe.src = "totalSent.html";
}
window.toggleTableModal1 = toggleTableModal1;

document.getElementById("closeModalBtn")?.addEventListener("click", function () {
  const modal = document.getElementById("tableModal1");
  const iframe = document.getElementById("totalSentIframe");
  modal.style.display = "none";
  iframe.src = "";
});

window.addEventListener("click", function (e) {
  const modal = document.getElementById("tableModal1");
  const content = document.querySelector(".modal-content2");
  if (e.target === modal) {
    modal.style.display = "none";
    document.getElementById("totalSentIframe").src = "";
  }
});

