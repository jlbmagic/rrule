import { datetime, RRule, RRuleSet, rrulestr } from "rrule";

window.createResult = (json) => {
  const o = JSON.parse(json);
  const obj = o.data;

  const { interval, start, end } = obj;
  console.log(obj);
  const newStartDate = new Date(start);
  const newEndDate = new Date(end);
  console.log(newStartDate, newEndDate);
  const newYear = newStartDate.getFullYear();
  const newMonth = newStartDate.getMonth();
  const newDay = newStartDate.getDate();
  const newHr = newStartDate.getHours();
  const newMin = newStartDate.getMinutes();
  const newSec = newStartDate.getSeconds();

  const newEndYear = newEndDate.getFullYear();
  const newEndMonth = newEndDate.getMonth();
  const newEndDay = newEndDate.getDate();

  // Create a rule:
  const rule = new RRule({
    freq: RRule.WEEKLY,
    interval: interval,
    byweekday: [RRule.MO, RRule.FR],
    dtstart: datetime(newYear, newMonth, newDay, newHr, newMin, newSec),
    until: datetime(newEndYear, newEndMonth, newEndDay),
  });

  // Get all occurrence dates (Date instances):
  const rules = rule.all();
  FileMaker.PerformScriptWithOption(
    "Collect results",
    JSON.stringify(rules),
    1
  );
  console.log("rule", rules);
};
