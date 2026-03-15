/**
 * Seed script for unahouse.finance — generates realistic Korean household finance data
 * for portfolio screenshot capture.
 *
 * Usage: npx tsx scripts/capture/seeds/unahouse-finance.ts [--reset]
 */
// @ts-expect-error node:sqlite is experimental in Node 25+
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(__dirname, "../../../../una.house.fiance/finance.db");

const reset = process.argv.includes("--reset");

console.log(`DB: ${DB_PATH}`);
console.log(`Mode: ${reset ? "RESET + SEED" : "SEED (append)"}`);

const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL");

// --- Helpers ---
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function randomDate(year: number, month: number): string {
  const daysInMonth = new Date(year, month, 0).getDate();
  return dateStr(year, month, randomInt(1, daysInMonth));
}

// --- Clear tables if reset ---
if (reset) {
  console.log("Resetting all data...");
  const tables = [
    "transaction_splits",
    "loan_repayments",
    "salary_items",
    "salary_statements",
    "transactions",
    "fixed_expenses",
    "loans",
    "trips",
    "cards",
    "family_members",
  ];
  for (const t of tables) {
    db.exec(`DELETE FROM ${t}`);
  }
  console.log("All tables cleared.");
}

// --- 1. Family Members ---
console.log("Seeding family_members...");
const insertFamily = db.prepare(
  "INSERT INTO family_members (name, relation, birth_year) VALUES (?, ?, ?)",
);
const families = [
  ["김민수", "본인", 1990],
  ["이지연", "배우자", 1992],
  ["김하은", "자녀", 2020],
  ["김서준", "자녀", 2023],
] as const;

for (const [name, relation, year] of families) {
  insertFamily.run(name, relation, year);
}

// Get family member IDs
const familyRows = db
  .prepare("SELECT id, name FROM family_members ORDER BY id")
  .all() as { id: number; name: string }[];
const familyMap = Object.fromEntries(familyRows.map((r) => [r.name, r.id]));

// --- 2. Cards ---
console.log("Seeding cards...");
const insertCard = db.prepare(
  `INSERT INTO cards (card_company, card_name, card_type, is_active, annual_fee, issue_date, monthly_target)
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
);
const cards = [
  ["국민카드", "KB국민 톡톡O카드", "신용", 1, 10000, "2022-03-15", 500000],
  ["신한카드", "신한 Deep Dream", "신용", 1, 15000, "2021-08-20", 600000],
  ["현대카드", "현대카드M", "신용", 1, 12000, "2023-01-10", 400000],
  ["농협카드", "NH올원페이", "체크", 1, 0, "2023-06-01", 0],
] as const;

for (const c of cards) {
  insertCard.run(...c);
}

const cardRows = db
  .prepare("SELECT id, card_company FROM cards ORDER BY id")
  .all() as { id: number; card_company: string }[];
const cardMap = Object.fromEntries(cardRows.map((r) => [r.card_company, r.id]));

// --- 3. Transactions (3 months) ---
console.log("Seeding transactions...");
const insertTx = db.prepare(
  `INSERT INTO transactions (date, card_company, merchant, amount, category_l1, category_l2, category_l3, necessity, family_member_id, card_id, is_manual)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
);

interface TxTemplate {
  merchant: string;
  amountRange: [number, number];
  l1: string;
  l2: string;
  l3: string;
  necessity: string;
  card: string;
  freq: number; // times per month
  familyMember?: string;
}

const txTemplates: TxTemplate[] = [
  // 식자재
  { merchant: "이마트", amountRange: [30000, 120000], l1: "식자재", l2: "마트", l3: "대형마트", necessity: "essential", card: "국민카드", freq: 4 },
  { merchant: "쿠팡프레시", amountRange: [15000, 60000], l1: "식자재", l2: "온라인식품", l3: "쿠팡", necessity: "essential", card: "신한카드", freq: 3 },
  { merchant: "GS25", amountRange: [2000, 8000], l1: "식자재", l2: "편의점", l3: "GS25", necessity: "discretionary", card: "농협카드", freq: 6 },

  // 외식
  { merchant: "맥도날드 강남점", amountRange: [8000, 25000], l1: "외식비", l2: "패스트푸드", l3: "맥도날드", necessity: "discretionary", card: "현대카드", freq: 2 },
  { merchant: "스타벅스 역삼점", amountRange: [5000, 12000], l1: "외식비", l2: "카페/음료", l3: "스타벅스", necessity: "discretionary", card: "현대카드", freq: 8 },
  { merchant: "배달의민족", amountRange: [15000, 40000], l1: "외식비", l2: "배달", l3: "배민", necessity: "discretionary", card: "신한카드", freq: 4 },
  { merchant: "한솥도시락", amountRange: [5000, 8000], l1: "외식비", l2: "한식", l3: "도시락", necessity: "essential", card: "국민카드", freq: 3 },

  // 교통
  { merchant: "하이패스", amountRange: [3000, 15000], l1: "교통", l2: "자동차", l3: "하이패스", necessity: "essential", card: "국민카드", freq: 3 },
  { merchant: "GS칼텍스 주유소", amountRange: [60000, 90000], l1: "교통", l2: "자동차", l3: "주유", necessity: "essential", card: "신한카드", freq: 2 },
  { merchant: "서울교통공사", amountRange: [1250, 1250], l1: "교통", l2: "대중교통", l3: "지하철", necessity: "essential", card: "농협카드", freq: 15 },

  // 구독
  { merchant: "넷플릭스", amountRange: [17000, 17000], l1: "구독", l2: "OTT", l3: "넷플릭스", necessity: "discretionary", card: "현대카드", freq: 1 },
  { merchant: "유튜브프리미엄", amountRange: [14900, 14900], l1: "구독", l2: "유튜브프리미엄", l3: "구글", necessity: "discretionary", card: "현대카드", freq: 1 },
  { merchant: "스포티파이", amountRange: [10900, 10900], l1: "구독", l2: "음악", l3: "스포티파이", necessity: "discretionary", card: "현대카드", freq: 1 },

  // 공과금
  { merchant: "한국전력", amountRange: [30000, 80000], l1: "공과금", l2: "전기", l3: "한전", necessity: "essential", card: "국민카드", freq: 1 },
  { merchant: "SK텔레콤", amountRange: [55000, 55000], l1: "공과금", l2: "통신", l3: "SKT", necessity: "essential", card: "국민카드", freq: 1 },
  { merchant: "KT인터넷", amountRange: [33000, 33000], l1: "공과금", l2: "인터넷", l3: "KT", necessity: "essential", card: "국민카드", freq: 1 },

  // 의료
  { merchant: "연세세브란스병원", amountRange: [10000, 80000], l1: "의료", l2: "병원", l3: "대학병원", necessity: "essential", card: "신한카드", freq: 1, familyMember: "이지연" },
  { merchant: "올리브약국", amountRange: [5000, 30000], l1: "의료", l2: "약국", l3: "약국", necessity: "essential", card: "농협카드", freq: 1 },

  // 교육
  { merchant: "교보문고", amountRange: [15000, 40000], l1: "교육", l2: "도서", l3: "온라인서점", necessity: "discretionary", card: "신한카드", freq: 1 },

  // 취미
  { merchant: "에니타임피트니스", amountRange: [50000, 50000], l1: "취미", l2: "운동/헬스", l3: "헬스장", necessity: "discretionary", card: "국민카드", freq: 1 },

  // 쇼핑
  { merchant: "쿠팡", amountRange: [10000, 80000], l1: "쇼핑", l2: "온라인", l3: "쿠팡", necessity: "discretionary", card: "신한카드", freq: 3 },
  { merchant: "유니클로 강남점", amountRange: [30000, 100000], l1: "쇼핑", l2: "의류/패션", l3: "유니클로", necessity: "discretionary", card: "현대카드", freq: 1 },

  // 아이 관련
  { merchant: "키즈카페 플레이팩토리", amountRange: [15000, 25000], l1: "취미", l2: "기타취미", l3: "키즈카페", necessity: "discretionary", card: "국민카드", freq: 2, familyMember: "김하은" },
];

const MONTHS = [
  { year: 2026, month: 1 },
  { year: 2026, month: 2 },
  { year: 2026, month: 3 },
];

let txCount = 0;
db.exec("BEGIN");
for (const { year, month } of MONTHS) {
  for (const tmpl of txTemplates) {
    for (let i = 0; i < tmpl.freq; i++) {
      const amount = randomInt(tmpl.amountRange[0], tmpl.amountRange[1]);
      const date = randomDate(year, month);
      const familyId = tmpl.familyMember
        ? familyMap[tmpl.familyMember]
        : familyMap["김민수"];
      const cardId = cardMap[tmpl.card];

      insertTx.run(
        date,
        tmpl.card,
        tmpl.merchant,
        amount,
        tmpl.l1,
        tmpl.l2,
        tmpl.l3,
        tmpl.necessity,
        familyId,
        cardId,
        0,
      );
      txCount++;
    }
  }
}
db.exec("COMMIT");
console.log(`  ${txCount} transactions seeded.`);

// --- 4. Salary Statements ---
console.log("Seeding salary_statements...");
const insertSalary = db.prepare(
  `INSERT INTO salary_statements (pay_date, employee_name, gross_pay, net_pay, total_deductions)
   VALUES (?, ?, ?, ?, ?)`,
);
const insertSalaryItem = db.prepare(
  `INSERT INTO salary_items (statement_id, type, name, amount)
   VALUES (?, ?, ?, ?)`,
);

for (const { year, month } of MONTHS) {
  const payDate = dateStr(year, month, 25);
  const grossPay = 5500000;
  const deductions = [
    ["국민연금", 247500],
    ["건강보험", 192500],
    ["장기요양", 24600],
    ["고용보험", 49500],
    ["소득세", 156000],
    ["지방소득세", 15600],
  ] as const;
  const totalDeductions = deductions.reduce((s, [, a]) => s + a, 0);
  const netPay = grossPay - totalDeductions;

  insertSalary.run(payDate, "김민수", grossPay, netPay, totalDeductions);
  const stmtId = (db.prepare("SELECT last_insert_rowid() as id").get() as { id: number }).id;

  // Payment items
  const payments = [
    ["기본급", 4800000],
    ["식대", 200000],
    ["교통비", 200000],
    ["직책수당", 300000],
  ] as const;
  for (const [name, amount] of payments) {
    insertSalaryItem.run(stmtId, "payment", name, amount);
  }

  // Deduction items
  for (const [name, amount] of deductions) {
    insertSalaryItem.run(stmtId, "deduction", name, amount);
  }
}

// --- 5. Fixed Expenses ---
console.log("Seeding fixed_expenses...");
const insertFixed = db.prepare(
  `INSERT INTO fixed_expenses (name, category, amount, frequency, payment_day, start_date, is_active)
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
);
const fixedExpenses = [
  ["주택청약 적금", "적금", 200000, "monthly", 5, "2023-01-01", 1],
  ["자유적금", "적금", 500000, "monthly", 10, "2024-06-01", 1],
  ["삼성화재 운전자보험", "보험", 45000, "monthly", 15, "2022-05-01", 1],
  ["교보생명 종신보험", "보험", 120000, "monthly", 20, "2021-03-01", 1],
  ["관리비", "공과금", 250000, "monthly", 25, "2023-09-01", 1],
  ["어린이집 등원비", "교육", 350000, "monthly", 1, "2024-03-01", 1],
  ["부모님 용돈", "용돈", 300000, "monthly", 25, "2020-01-01", 1],
  ["기부금 (월드비전)", "기부", 30000, "monthly", 15, "2022-01-01", 1],
] as const;

for (const f of fixedExpenses) {
  insertFixed.run(...f);
}

// --- 6. Loans ---
console.log("Seeding loans...");
const insertLoan = db.prepare(
  `INSERT INTO loans (loan_type, loan_name, lender, original_amount, outstanding_amount, interest_rate, rate_type, repay_method, monthly_payment)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
);
insertLoan.run(
  "주택",
  "주택담보대출",
  "KB국민은행",
  400000000,
  320000000,
  3.85,
  "변동",
  "원리금균등",
  1850000,
);

// --- 7. Trips ---
console.log("Seeding trips...");
const insertTrip = db.prepare(
  `INSERT INTO trips (name, destination, start_date, end_date, budget)
   VALUES (?, ?, ?, ?, ?)`,
);
insertTrip.run("제주도 가족여행", "제주도", "2026-02-08", "2026-02-11", 1500000);

// Tag some Feb transactions as trip expenses
const tripRow = db
  .prepare("SELECT id FROM trips ORDER BY id DESC LIMIT 1")
  .get() as { id: number };

const insertTripTx = db.prepare(
  `INSERT INTO transactions (date, card_company, merchant, amount, category_l1, category_l2, category_l3, necessity, family_member_id, card_id, trip_id, is_manual)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
);
const tripTxs = [
  ["2026-02-08", "신한카드", "제주항공", 480000, "여행", "항공", "제주항공", "discretionary"],
  ["2026-02-08", "국민카드", "롯데호텔제주", 350000, "여행", "숙박", "호텔", "discretionary"],
  ["2026-02-09", "현대카드", "제주흑돼지 맛집", 85000, "외식비", "한식", "제주맛집", "discretionary"],
  ["2026-02-10", "국민카드", "성산일출봉 매표소", 15000, "여행", "관광", "입장료", "discretionary"],
  ["2026-02-10", "신한카드", "제주렌터카", 180000, "교통", "자동차", "렌터카", "essential"],
  ["2026-02-11", "현대카드", "제주공항 면세점", 120000, "쇼핑", "면세점", "면세점", "discretionary"],
] as const;

for (const [date, card, merchant, amount, l1, l2, l3, necessity] of tripTxs) {
  const cardId = cardMap[card as string];
  insertTripTx.run(
    date,
    card,
    merchant,
    amount,
    l1,
    l2,
    l3,
    necessity,
    familyMap["김민수"],
    cardId,
    tripRow.id,
    0,
  );
  txCount++;
}

console.log(`\nSeed complete!`);
console.log(`  Family members: ${families.length}`);
console.log(`  Cards: ${cards.length}`);
console.log(`  Transactions: ${txCount}`);
console.log(`  Salary statements: ${MONTHS.length}`);
console.log(`  Fixed expenses: ${fixedExpenses.length}`);
console.log(`  Loans: 1`);
console.log(`  Trips: 1`);

db.close();
