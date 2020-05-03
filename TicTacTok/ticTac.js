var 바디 = document.body;
var 테이블 = document.createElement("table");
var 줄들 = [];
var 칸들 = [];
var 턴 = "X";
var 결과 = document.createElement("h1");

function 결과체크(몇줄, 몇칸) {
    var 다참 = false;
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
    return 다참;
}

function 초기화(무승부) {
    if (무승부) {
        결과.textContent = "무승부";
    } else {
        결과.textContent = 턴 + "님이 승리!";
    }

    setTimeout(function () {
        결과.textContent = "";
        칸들.forEach(function (줄) {
            줄.forEach(function (칸) {
                칸.textContent = "";
            });
        });
        턴 = "X";
    }, 1000);
}

var 비동기콜백 = function (e) {
    if (턴 === "O") {
        // 컴퓨터의 턴일 때 내가 클릭하지 않도록
        return;
    }
    //칸을 클릭했을 때
    var 몇줄 = 줄들.indexOf(e.target.parentNode); // 배열이 아닌 애들한테는 indexOf를 못쓴다.
    var 몇칸 = 칸들[몇줄].indexOf(e.target);
    if (칸들[몇줄][몇칸].textContent !== "") {
        // 빈 칸 아닌 곳에 넣음
    } else {
        // 빈 칸인 곳에 넣는 것
        칸들[몇줄][몇칸].textContent = 턴;
        var 다참 = 결과체크(몇줄, 몇칸);

        // 모든 칸이 다 찼는지 검사
        var 후보칸 = [];
        칸들.forEach(function (줄) {
            줄.forEach(function (칸) {
                후보칸.push(칸);
            });
        });
        후보칸 = 후보칸.filter(function (칸) {
            // filter 메서드는 return 에서 트루값만 후보칸으로 필터링해주는 것
            return !칸.textContent;
        });
        if (승리여부) {
            초기화(false);
        } else if (후보칸.length === 0) {
            // 칸을 더이상 선택할 수 없음
            초기화(true);
        } else {
            if (턴 === "X") {
                // 다 안찼으면
                턴 = "O";
            }
            setTimeout(function () {
                console.log("컴퓨터의 턴입니다.");
                // 빈 칸 중 하나를 넘긴다.
                var 후보칸 = [];
                칸들.forEach(function (줄) {
                    줄.forEach(function (칸) {
                        후보칸.push(칸);
                    });
                });
                후보칸 = 후보칸.filter(function (칸) {
                    // filter 메서드는 return 에서 트루값만 후보칸으로 필터링해주는 것
                    return !칸.textContent;
                });
                var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];
                선택칸.textContent = 턴;
                var 몇줄 = 줄들.indexOf(선택칸.parentNode);
                var 몇칸 = 칸들[몇줄].indexOf(선택칸);
                var 승리여부 = 결과체크(몇줄, 몇칸);
                if (승리여부) {
                    초기화();
                }
                // 턴을 넘긴다.
                턴 = "X";
            }, 1000);
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
