const regex = /\B(?=(\d{3})+(?!\d))/g;

function addCommas(money, reg) {
  return "$" + money.slice(1).replace(reg, ",");
}
