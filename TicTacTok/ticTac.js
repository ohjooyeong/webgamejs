var 바디 = document.body;
var 테이블 = document.createElement("table");
var 줄들 = [];
var 칸들 = [];
var 턴 = "X";
var 결과 = document.createElement("h1");

var 비동기콜백 = function (e) {
    console.log(e.target);
    var 몇줄 = 줄들.indexOf(e.target.parentNode);
    var 몇칸 = 칸들[몇줄].indexOf(e.target);
    if (칸들[몇줄][몇칸].textContent === "") {
        // 빈 칸인 곳에 넣는 것
        칸들[몇줄][몇칸].textContent = 턴;
        var 다참 = false;
        // 가로줄 검사
        if (
            칸들[몇줄][0].textContent === 턴 &&
            칸들[몇줄][1].textContent === 턴 &&
            칸들[몇줄][2].textContent === 턴
        ) {
            다참 = true;
        }
        // 세로줄 검사
        if (
            칸들[0][몇칸].textContent === 턴 &&
            칸들[1][몇칸].textContent === 턴 &&
            칸들[2][몇칸].textContent === 턴
        ) {
            다참 = true;
        }
        // 대각선 검사
        if (몇줄 - 몇칸 === 0 || Math.abs(몇줄 - 몇칸) === 2) {
            if (
                칸들[0][0].textContent === 턴 &&
                칸들[1][1].textContent === 턴 &&
                칸들[2][2].textContent === 턴
            ) {
                다참 = true;
            }
            if (
                칸들[0][2].textContent === 턴 &&
                칸들[1][1].textContent === 턴 &&
                칸들[2][0].textContent === 턴
            ) {
                다참 = true;
            }
        }
    } else {
        // 빈 칸 아닌 곳에 넣음
    }

    if (다참) {
        결과.textContent = 턴 + "님이 승리!";
        턴 = "X";
        칸들.forEach(function (줄) {
            줄.forEach(function (칸) {
                칸.textContent = "";
            });
        });
    } else {
        if (턴 === "X") {
            턴 = "O";
        } else {
            턴 = "X";
        }
    }
};

for (i = 1; i <= 3; i++) {
    var 줄 = document.createElement("tr");
    줄들.push(줄);
    칸들.push([]);
    for (j = 1; j <= 3; j++) {
        var 칸 = document.createElement("td");
        칸.addEventListener("click", 비동기콜백);
        칸들[i - 1].push(칸);
        줄.appendChild(칸);
    }
    테이블.appendChild(줄);
}
바디.appendChild(테이블);
바디.appendChild(결과);
