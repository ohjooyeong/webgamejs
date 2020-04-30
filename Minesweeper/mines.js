var tbody = document.querySelector("#table tbody");
var dataset = [];
document.querySelector("#exec").addEventListener("click", function () {
    // 내부 먼저 초기화
    tbody.innerHTML = "";
    var hor = parseInt(document.querySelector("#hor").value);
    var ver = parseInt(document.querySelector("#ver").value);
    var mine = parseInt(document.querySelector("#mine").value);

    //지뢰 위치 뽑기
    var 후보군 = Array(hor * ver)
        .fill()
        .map(function (요소, 인덱스) {
            return 인덱스;
        });
    var 셔플 = [];
    while (후보군.length > hor * ver - mine) {
        var 이동값 = 후보군.splice(
            // 랜덤한 배열의 인덱스값을 삭제 및 그 값을 이동값에 넣어주는 것 배열상태로 나오기때문에 [0]을 한다.
            Math.floor(Math.random() * 후보군.length),
            1
        )[0];
        셔플.push(이동값);
    }

    // 지뢰 테이블 만들기

    for (var i = 0; i < ver; i++) {
        var arr = [];
        dataset.push(arr);
        var tr = document.createElement("tr");
        for (var j = 0; j < hor; j++) {
            arr.push(1);
            var td = document.createElement("td");
            td.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(
                    부모tr.children,
                    e.currentTarget
                );
                var 줄 = Array.prototype.indexOf.call(
                    부모tbody.children,
                    부모tr
                );
                if (
                    e.currentTarget.textContent === "" ||
                    e.currentTarget.textContent === "X"
                ) {
                    e.currentTarget.textContent = "!";
                } else if (e.currentTarget.textContent === "!") {
                    e.currentTarget.textContent = "?";
                } else if (e.currentTarget.textContent === "?") {
                    if (dataset[줄][칸] === 1) {
                        e.currentTarget.textContent = "";
                    } else if (dataset[줄][칸] === "X") {
                        e.currentTarget.textContent = "X";
                    }
                }
            });
            td.addEventListener("click", function (e) {
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(
                    부모tr.children,
                    e.currentTarget
                );
                var 줄 = Array.prototype.indexOf.call(
                    부모tbody.children,
                    부모tr
                );
                if (dataset[줄][칸] === "X") {
                    e.currentTarget.textContent = "펑";
                } else {
                    // 팔방의 X가 몇개인지 찾는 것
                    var 주변 = [dataset[줄][칸 - 1], dataset[줄][칸 + 1]];
                    if (dataset[줄 - 1]) {
                        주변 = 주변.concat(
                            dataset[줄 - 1][칸 - 1],
                            dataset[줄 - 1][칸],
                            dataset[줄 - 1][칸 + 1]
                        );
                    }
                    if (dataset[줄 + 1]) {
                        주변 = 주변.concat(
                            dataset[줄 + 1][칸 - 1],
                            dataset[줄 + 1][칸],
                            dataset[줄 + 1][칸 + 1]
                        );
                    }
                    e.currentTarget.textContent = 주변.filter(function (v) {
                        return v === "X";
                    }).length;
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    // 지뢰 심기
    for (var k = 0; k < 셔플.length; k++) {
        var 세로 = Math.floor(셔플[k] / 10);
        var 가로 = 셔플[k] % 10;
        tbody.children[세로].children[가로].textContent = "X";
        dataset[세로][가로] = "X";
    }
});

// e.currentTarget 은 이벤트리스너를 단 대상이 커런트타겟이고 e.target은 실제 이벤트가 실제로 발생한 타겟
