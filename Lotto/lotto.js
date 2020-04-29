var 후보군 = Array(45)
    .fill()
    .map(function (요소, 인덱스) {
        return 인덱스 + 1;
    });

console.log(후보군);

var 셔플 = [];
while (후보군.length > 0) {
    var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
    셔플.push(이동값);
}
console.log(셔플);
var 보너스 = 셔플[셔플.length - 1];
var 당첨숫자들 = 셔플.slice(0, 6);

console.log(
    당첨숫자들.sort(function (p, c) {
        return p - c;
    }),
    보너스
);

var res = document.querySelector("#res");

function 공색칠하기(num, res) {
    var 공 = document.createElement("div");
    공.textContent = num;
    공.style.display = "inline-block";
    공.style.border = "1px solid black";
    공.style.borderRadius = "10px";
    공.style.width = "20px";
    공.style.marginRight = "5px";
    공.style.fontSize = "15px";
    공.style.textAlign = "center";
    var 배경색;
    var 글자색;
    if (num <= 10) {
        배경색 = "red";
        글자색 = "black";
    } else if (num <= 20) {
        배경색 = "orange";
        글자색 = "black";
    } else if (num <= 30) {
        배경색 = "yellow";
        글자색 = "black";
    } else if (num <= 40) {
        배경색 = "blue";
        글자색 = "white";
    } else if (num <= 45) {
        배경색 = "green";
        글자색 = "white";
    }
    공.style.background = 배경색;
    공.style.color = 글자색;
    res.appendChild(공);
}

setTimeout(function callback() {
    공색칠하기(당첨숫자들[0], res);
}, 1000);
setTimeout(function callback() {
    공색칠하기(당첨숫자들[1], res);
}, 2000);
setTimeout(function callback() {
    공색칠하기(당첨숫자들[2], res);
}, 3000);
setTimeout(function callback() {
    공색칠하기(당첨숫자들[3], res);
}, 4000);
setTimeout(function callback() {
    공색칠하기(당첨숫자들[4], res);
}, 5000);
setTimeout(function callback() {
    공색칠하기(당첨숫자들[5], res);
}, 6000);

setTimeout(function callback() {
    var 칸 = document.querySelector(".bonus");
    공색칠하기(보너스, 칸);
}, 7000);
