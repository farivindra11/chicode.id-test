import http from "../api/index";

export function getData() {
  return http.get("/");
}

export function getConfirmed() {
  return http.get("/confirmed");
}

export function getRecovered() {
  return http.get("/recovered");
}

export function getDeaths() {
  return http.get("/deaths");
}

export function getDailySummary() {
  return http.get("/daily");
}
export function getDaily() {
  return http.get("/daily/5-21-2021");
}
