var tbody = document.querySelector("#table tbody");
var dataset = [];
var 중단플래그 = false;
var 열은칸 = 0;
var 코드표 = {
    연칸: -1,
    물을표: -2,
    깃발: -3,
    깃발지뢰: -4,
    물음표지뢰: -5,
    지뢰: 1,
    보통칸: 0,
};
document.querySelector("#exec").addEventListener("click", function () {
    // 내부 먼저 초기화
    tbody.innerHTML = "";
    document.querySelector("#result").textContent = "";
    dataset = [];
    열은칸 = 0;
    중단플래그 = false;
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
            arr.push(코드표.보통칸);
            var td = document.createElement("td");
            // 오른쪽 클릭
            td.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                if (중단플래그) {
                    return;
                }

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
                if (dataset[줄][칸] === 코드표.연칸) {
                    return;
                }
                if (
                    e.currentTarget.textContent === "" ||
                    e.currentTarget.textContent === "X"
                ) {
                    e.currentTarget.textContent = "!";
                    e.currentTarget.classList.add("flag");
                    if (dataset[줄][칸] === 코드표.지뢰) {
                        dataset[줄][칸] = 코드표.깃발지뢰;
                    } else {
                        dataset[줄][칸] = 코드표.깃발;
                    }
                } else if (e.currentTarget.textContent === "!") {
                    e.currentTarget.textContent = "?";
                    e.currentTarget.classList.remove("flag");
                    e.currentTarget.classList.add("question");
                    if (dataset[줄][칸] === 코드표.깃발지뢰) {
                        dataset[줄][칸] = 코드표.물음표지뢰;
                    } else {
                        dataset[줄][칸] = 코드표.물음표;
                    }
                } else if (e.currentTarget.textContent === "?") {
                    e.currentTarget.classList.remove("question");
                    if (dataset[줄][칸] === 코드표.물음표지뢰) {
                        e.currentTarget.textContent = "X";
                        dataset[줄][칸] = 코드표.지뢰;
                    } else {
                        e.currentTarget.textContent = "";
                        dataset[줄][칸] = 코드표.보통칸;
                    }
                }
            });
            td.addEventListener("click", function (e) {
                if (중단플래그) {
                    return;
                }

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
                    [
                        코드표.연칸,
                        코드표.깃발,
                        코드표.깃발지뢰,
                        코드표.물음표지뢰,
                        코드표.물음표,
                    ].includes(dataset[줄][칸])
                ) {
                    return;
                }
                // 클릭했을때
                e.currentTarget.classList.add("opened");
                열은칸 += 1;
                if (dataset[줄][칸] === 코드표.지뢰) {
                    e.currentTarget.textContent = "펑";
                    document.querySelector("#result").textContent = "실패";
                    중단플래그 = true;
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
                    var 주변지뢰개수 = 주변.filter(function (v) {
                        return [
                            코드표.지뢰,
                            코드표.깃발지뢰,
                            코드표.물음표지뢰,
                        ].includes(v);
                    }).length;
                    // 거짓인 값 : false, '', 0, null, undefined, NaN
                    e.currentTarget.textContent = 주변지뢰개수 || ""; // 거짓인 값이 앞에 오면 뒤에 껄 써라
                    dataset[줄][칸] = 코드표.연칸;
                    if (주변지뢰개수 === 0) {
                        // 주변 8칸 동시 오픈(재귀 함수)
                        var 주변칸 = [];
                        if (tbody.children[줄 - 1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[줄 - 1].children[칸 - 1],
                                tbody.children[줄 - 1].children[칸],
                                tbody.children[줄 - 1].children[칸 + 1],
                            ]);
                        }
                        주변칸 = 주변칸.concat([
                            tbody.children[줄].children[칸 - 1],
                            tbody.children[줄].children[칸 + 1],
                        ]);
                        if (tbody.children[줄 + 1]) {
                            주변칸 = 주변칸.concat([
                                tbody.children[줄 + 1].children[칸 - 1],
                                tbody.children[줄 + 1].children[칸],
                                tbody.children[줄 + 1].children[칸 + 1],
                            ]);
                        }
                        // undefined 나 null 0 을 제거하는 코드 주변칸.filter((v) => !!v)
                        주변칸.filter(function (v) {
                            return !!v;
                        }).forEach(function (옆칸) {
                            var 부모tr = 옆칸.parentNode;
                            var 부모tbody = 옆칸.parentNode.parentNode;
                            var 옆칸칸 = Array.prototype.indexOf.call(
                                부모tr.children,
                                옆칸
                            );
                            var 옆칸줄 = Array.prototype.indexOf.call(
                                부모tbody.children,
                                부모tr
                            );
                            if (dataset[옆칸줄][옆칸칸] !== 코드표.연칸) {
                                옆칸.click();
                            }
                        });
                    }
                }
                if (열은칸 === hor * ver - mine) {
                    중단플래그 = true;
                    document.querySelector("#result").textContent = "승리 ^^";
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    // 지뢰 심기
    for (var k = 0; k < 셔플.length; k++) {
        var 세로 = Math.floor(셔플[k] / ver);
        var 가로 = 셔플[k] % ver;
        tbody.children[세로].children[가로].textContent = "X";
        dataset[세로][가로] = 코드표.지뢰;
    }
});

// e.currentTarget 은 이벤트리스너를 단 대상이 커런트타겟이고 e.target은 실제 이벤트가 실제로 발생한 타겟
