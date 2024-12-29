#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const argv = minimist(process.argv.slice(2));
const year = argv["y"] ? argv["y"] : dayjs().year();
const month = argv["m"] ? argv["m"] - 1 : dayjs().month();

const first_date = dayjs(new Date(year, month, 1));
const last_date = dayjs(new Date(year, month + 1, 0));

const days = [];

for (let i = 1; i <= last_date.date(); i++) {
  days.push(dayjs(new Date(year, month, i)));
}

const calender_body =
  days
    .map((day) => {
      const padded_day = String(day.date()).padStart(2, " ");
      if (day.day() === 6) {
        return `${padded_day}\n`;
      } else {
        return `${padded_day} `;
      }
    })
    .join("") + "\n";

const month_and_year = `     ${month + 1}月 ${year}\n`;
const weekdays = "日 月 火 水 木 金 土\n";
const leading_spaces = "   ".repeat(first_date.day());
process.stdout.write(
  month_and_year + weekdays + leading_spaces + calender_body,
);
