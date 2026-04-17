import { Link, useParams } from "react-router-dom";
import { useMemo, useCallback } from "react";
import { ArrowLeft, Receipt, ArrowRight, Banknote, Calendar } from "lucide-react";
import { format } from "date-fns";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";

import AddMemberDialog from "../components/AddMemberDialog";
import CreateExpenseDialog from "../components/CreateExpenseDialog";
import SettleUpDialog from "../components/SettleUpDialog";

import { useAuth } from "../context/AuthContext";
import { useGroup } from "../hooks/useGroups";
import { useExpenses } from "../hooks/useExpenses";
import { useSettlements } from "../hooks/useSettlements";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { useGroupReport } from "../hooks/useGroupReport";

export default function GroupView() {
  const { id } = useParams();
  const { user } = useAuth();

  const { group, loading: groupLoading} = useGroup(id);
  const { expenses = [], loading: expensesLoading ,  addExpense} = useExpenses(id);
  const {
    settlements = [],
    loading: settlementsLoading,
     addSettlement,
  } = useSettlements(id);
  const { report, loading: loadingReport } = useGroupReport(id);
  /* ================= SAFE DERIVED DATA ================= */

  const members = useMemo(() => group?.members || [], [group]);

  const getMemberName = useCallback(
    (userId) => {
      const m = members.find((x) => x._id === userId);
      return m?.firstName || m?.email || "User";
    },
    [members]
  );

  /* ================= BALANCES (EXPENSES + SETTLEMENTS) ================= */

  const balances = useMemo(() => {
    if (!members.length) return [];

    const map = {};
    members.forEach((m) => (map[m._id] = 0));

    // ===== EXPENSES =====
    expenses.forEach((e) => {
      const total = Number(e.amount);

      // payer paid everything
      map[e.payerId] += total;

      // everyone owes their share
      e.splits?.forEach((s) => {
        map[s.userId] -= Number(s.amount);
      });
    });

    // ===== SETTLEMENTS =====
    settlements.forEach((s) => {
      map[s.from] += Number(s.amount);
      map[s.to] -= Number(s.amount);
    });

    // round to avoid floating errors
    return Object.entries(map).map(([userId, amount]) => ({
      userId,
      amount: Math.round(amount * 100) / 100,
    }));
  }, [members, expenses, settlements]);


  const myBalance = useMemo(() => {
    if (!user) return 0;
    return balances.find((b) => b.userId === user.id)?.amount || 0;
  }, [balances, user]);
  console.log(user.id)
  console.log(balances)
console.log(myBalance)
  const balanceChartData = useMemo(
    () =>
      balances.map((b) => ({
        name: getMemberName(b.userId),
        amount: b.amount,
      })),
    [balances, getMemberName]
  );
  const whoOwesWhom = useMemo(
    () => calculateWhoOwesWhom(balances),
    [balances]
  );

  /* ================= LOADING ================= */

  if (groupLoading) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <Skeleton className="h-64 rounded-3xl" />
      </div>
    );
  }

  if (!group) {
    return <div className="p-8 text-center">Group not found</div>;
  }



  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* ===== HEADER ===== */}
      <div className="bg-primary text-primary-foreground pt-8 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/dashboard"
            className="inline-flex items-center opacity-80 hover:opacity-100 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>

         <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{group.name}</h1>
              <p className="opacity-80 max-w-xl">
                {group.description || "No description"}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-6">
               <div className="flex -space-x-2">
  {members.map((m) => (
    <div key={m._id} className="relative group">
      
      {/* Avatar */}
      <div className="
         rounded-full bg-white/20
        flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 text-[10px] sm:text-xs
        cursor-pointer
      ">
        {(m.firstName || m.email || "U")[0].toUpperCase()}
      </div>

      {/* Tooltip */}
      <div className="
        absolute bottom-10 left-1/2 -translate-x-1/2
        bg-black text-white text-xs
        px-2 py-1 rounded-md
        opacity-0 group-hover:opacity-100
        transition
        whitespace-nowrap
        pointer-events-none
      ">
        {m.firstName || m.email}
      </div>

    </div>
  ))}
</div>

                <AddMemberDialog groupId={id}    />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 min-w-[240px] border">
              <div className="text-sm opacity-80 mb-1">Your Balance</div>
              <div
                className={`text-3xl font-bold font-mono ${myBalance > 0
                  ? "text-emerald-300"
                  : myBalance < 0
                    ? "text-rose-300"
                    : "text-white"
                  }`}
              >
                {myBalance > 0 && "+"}₹{Math.abs(myBalance).toFixed(2)}
              </div>
              <div className="text-xs opacity-70 mt-1">
                {myBalance > 0
                  ? "You are owed"
                  : myBalance < 0
                    ? "You owe"
                    : "All settled"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 -mt-5">
        <Tabs defaultValue="expenses" className="space-y-8">
        <TabsList className="
  flex w-full sm:w-fit overflow-x-auto
  bg-white rounded-xl shadow-md border p-2 gap-1
">
            <TabsTrigger value="expenses" className="px-4 py-2 rounded-xl text-sm
  data-[state=active]:bg-[#E8F6F3]
  
  transition"
            >Expenses</TabsTrigger>
            <TabsTrigger value="balances" className="px-4 py-2 rounded-xl text-sm
  data-[state=active]:bg-[#E8F6F3]
  
  transition">Balances</TabsTrigger>
            <TabsTrigger value="settlements" className="px-4 py-2 rounded-xl text-sm
  data-[state=active]:bg-[#E8F6F3]
  
  transition">Settlements</TabsTrigger>
            <TabsTrigger value="reports" className="px-4 py-2 rounded-xl text-sm
  data-[state=active]:bg-[#E8F6F3]
  
  transition">Reports</TabsTrigger>
          </TabsList>

          {/* ===== EXPENSES ===== */}
          {/* ===== EXPENSES ===== */}
          <TabsContent value="expenses" className="space-y-6">
            <div className="flex justify-end">
              <CreateExpenseDialog groupId={id} members={members}  addExpense={addExpense} />
            </div>

            {expensesLoading ? (
              <Skeleton className="h-24 rounded-xl" />
            ) : expenses.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border rounded-xl">
                <Receipt className="w-12 h-12 mx-auto mb-4 opacity-50" />
                No expenses yet
              </div>
            ) : (
              expenses.map((exp) => {
                const splitType = getSplitType(exp);
                const payerName = getMemberName(exp.payerId);

                const involvedSplits =
                  exp.splits?.filter((s) => s.amount > 0) || [];

                return (
                  <div
                    key={exp._id}
                    className="bg-card p-5 rounded-xl border space-y-4"
                  >
                    {/* HEADER */}
                   <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                      <div>
                        <h3 className="font-semibold">{exp.description}</h3>

                        <p className="text-sm text-muted-foreground">
                          Paid by <span className="font-medium">{payerName}</span>
                          {" • "}
                          {safeFormatDate(exp.createdAt)}
                          {" • "}
                          {splitType === "equal" && "Split equally"}
                          {splitType === "exact" && "Exact split"}
                          {splitType === "percentage" && "Percentage split"}
                        </p>

                        <p className="text-xs text-muted-foreground mt-1">
                          {payerName} paid ₹{Number(exp.amount).toFixed(2)}
                        </p>
                      </div>

                      <div className="font-mono font-bold text-lg">
                        ₹{Number(exp.amount).toFixed(2)}
                      </div>
                    </div>

                    {/* SPLIT TABLE */}
                    <div className="border-t pt-3 space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">
                        Split breakdown
                      </div>

                      {involvedSplits.map((s) => {
                        const name = getMemberName(s.userId);
                        const isPayer = s.userId === exp.payerId;

                        // Guarantee percentage display
                        let percent = s.percentage;
                        if (
                          splitType === "percentage" &&
                          typeof percent !== "number"
                        ) {
                          percent =
                            (Number(s.amount) / Number(exp.amount)) * 100;
                        }

                        return (
                          <div
                            key={s.userId}
                            className="flex justify-between text-sm"
                          >
                            <span className={isPayer ? "font-semibold" : ""}>
                              {name} {isPayer && "(payer)"}
                            </span>

                            <span className="font-mono">
                              ₹{Number(s.amount).toFixed(2)}
                              {splitType === "percentage" && (
                                <span className="text-muted-foreground ml-1">
                                  ({percent.toFixed(1)}%)
                                </span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* WHO OWES PAYER */}
                    <div className="space-y-1 pt-2">
                      {involvedSplits
                        .filter((s) => s.userId !== exp.payerId)
                        .map((s) => {
                          const borrower = getMemberName(s.userId);

                          return (
                            <div
                              key={s.userId}
                              className="flex justify-between text-rose-600 text-sm"
                            >
                              <span>
                                <strong>{borrower}</strong> owes{" "}
                                <strong>{payerName}</strong>
                              </span>

                              <span className="font-mono">
                                ₹{Number(s.amount).toFixed(2)}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>


          {/* ===== BALANCES ===== */}
<TabsContent value="balances" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Balance Chart</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">

                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={balanceChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount">
                      {balanceChartData.map((e, i) => (
                        <Cell
                          key={i}
                          fill={e.amount >= 0 ? "#10b981" : "#f43f5e"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

              </CardContent>
            </Card>

            <div className="space-y-3">
              {balances.map((b) => (
                <div
                  key={b.userId}
                  className="flex justify-between p-4 bg-card border rounded-xl"
                >
                  <span>{getMemberName(b.userId)}</span>
                  <span
                    className={`font-mono font-bold ${b.amount >= 0 ? "text-emerald-600" : "text-rose-600"
                      }`}
                  >
                    {b.amount >= 0 ? "gets" : "owes"} ₹
                    {Math.abs(b.amount).toFixed(2)}
                  </span>
                </div>
              ))}
              {/* WHO OWES WHOM */}
              <div>
                <h3 className="font-semibold mb-3">Who owes whom</h3>

                {whoOwesWhom.length === 0 ? (
                  <div className="text-sm text-muted-foreground text-center py-4">
                    All settled 🎉
                  </div>
                ) : (
                  <div className="space-y-2">
                    {whoOwesWhom.map((s, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center p-3 rounded-lg border bg-rose-50"
                      >
                        <span className="text-sm">
                          <strong>{getMemberName(s.from)}</strong> pays{" "}
                          <strong>{getMemberName(s.to)}</strong>
                        </span>
                        <span className="font-mono font-bold text-rose-600">
                          ₹{s.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>


          </TabsContent>

          {/* ===== SETTLEMENTS ===== */}
          {/* ===== SETTLEMENTS ===== */}
          <TabsContent value="settlements" className="space-y-6">
            <div className="flex justify-end">
              <SettleUpDialog groupId={id} members={members}  addSettlement={addSettlement}/>
            </div>

            {settlementsLoading ? (
              <Skeleton className="h-32 rounded-xl" />
            ) : settlements.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border rounded-xl">
                No settlements recorded yet
              </div>
            ) : (
              <div className="space-y-3">
                {settlements.map((s) => (
                  <div
                    key={s._id}
                    className="bg-card p-5 rounded-xl border flex items-center gap-4"
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Banknote className="w-5 h-5" />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-bold">
                          {getMemberName(s.from)}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <span className="font-bold">
                          {getMemberName(s.to)}
                        </span>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {safeFormatDate(s.createdAt, "dd MMM yyyy")}
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="font-mono font-bold text-emerald-600">
                      ₹{Number(s.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="reports" className="space-y-6">
            {loadingReport ? (
              <Skeleton className="h-32 rounded-xl" />
            ) : !report ? (
              <div>Failed to load report</div>
            ) : (
              <>
                {/* SUMMARY CARDS */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      ₹{report.totalExpenses.toFixed(2)}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Total Settlements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      ₹{report.totalSettlements.toFixed(2)}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {members.length}
                    </CardContent>
                  </Card>
                </div>

                {/* CHARTS */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* PIE CHART */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Spending by Member</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={report.expensesByUser.map((e) => ({
                            name: getMemberName(e.userId),
                            total: e.total,
                          }))}
                        >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="total">
                            {report.expensesByUser.map((_, i) => (
                              <Cell
                                key={i}
                                fill={["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"][i % 5]}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Consumption</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={report.contributionByUser.map((e) => ({
                            name: getMemberName(e.userId),
                            total: e.total,
                          }))}
                        >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="total" fill="#6366f1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>


                </div>


              </>
            )}
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
function calculateWhoOwesWhom(balances) {
  // copy + clean small floating noise
  const debtors = balances
    .filter((b) => b.amount < -0.01)
    .map((b) => ({
      userId: b.userId,
      remaining: Math.abs(b.amount),
    }));

  const creditors = balances
    .filter((b) => b.amount > 0.01)
    .map((b) => ({
      userId: b.userId,
      remaining: b.amount,
    }));

  // sort largest first → fewer transactions
  debtors.sort((a, b) => b.remaining - a.remaining);
  creditors.sort((a, b) => b.remaining - a.remaining);

  const result = [];

  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const d = debtors[i];
    const c = creditors[j];

    const amount = Math.min(d.remaining, c.remaining);

    result.push({
      from: d.userId,
      to: c.userId,
      amount: Math.round(amount * 100) / 100,
    });

    d.remaining -= amount;
    c.remaining -= amount;

    if (d.remaining < 0.01) i++;
    if (c.remaining < 0.01) j++;
  }

  return result;
}


function safeFormatDate(value, pattern = "dd MMM yyyy") {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return format(d, pattern);
}

function getSplitType(expense) { if (!expense.splits?.length) return "equal"; const hasPercentage = expense.splits.some((s) => typeof s.percentage === "number"); if (hasPercentage) return "percentage"; const amounts = expense.splits.map((s) => s.amount); const allEqual = amounts.every((a) => a === amounts[0]); return allEqual ? "equal" : "exact"; }