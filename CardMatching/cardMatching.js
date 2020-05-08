var 가로 = 4;
var 세로 = 3;
var 색깔들 = ["red", "red", "orange", "orange", "green", "green", "yellow", "yellow", "white", "white", "pink", "pink"];
// 숫자 문자 boolean 은 다음 변수의 값 대입해도 안바뀐다.
// 객체, 배열은 다음 변수의 값을 대입하면 바뀐다. 참조라고 함. 객체는 대입하면 참조관계가 된다.

var 색깔후보 = 색깔들.slice();
var 색깔 = [];
var 클릭플래그 = true;
var 클릭카드 = [];
var 완성카드 = [];
function 셔플() {
    for (var i = 0; 색깔후보.length > 0; i++) {
        색깔 = 색깔.concat(색깔후보.splice(Math.floor(Math.random() * 색깔후보.length), 1));
    }
}

var 시작시간;

function 카드세팅(가로, 세로) {
    var 클릭플래그 = false;
    for (var i = 0; i < 가로 * 세로; i++) {
        var card = document.createElement("div");
        card.className = "card";
        var cardInner = document.createElement("div");
        cardInner.className = "card-inner";
        var cardFront = document.createElement("div");
        cardFront.className = "card-front";
        var cardBack = document.createElement("div");
        cardBack.className = "card-back";
        cardBack.style.backgroundColor = 색깔[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function (c) {
            // 클로저 문제 해결
            card.addEventListener("click", function () {
                if (클릭플래그 && !완성카드.includes(c)) {
                    c.classList.toggle("flipped");
                    클릭카드.push(c);
                    if (클릭카드.length === 2) {
                        if (
                            클릭카드[0].querySelector(".card-back").style.backgroundColor ===
                            클릭카드[1].querySelector(".card-back").style.backgroundColor
                        ) {
                            완성카드.push(클릭카드[0]);
                            완성카드.push(클릭카드[1]);
                            클릭카드 = [];
                            if (완성카드.length === 가로 * 세로) {
                                var 끝시간 = new Date();
                                alert("축하합니다 성공! " + (끝시간 - 시작시간) / 1000 + " 초 걸렸습니다.");
                                document.querySelector("#wrapper").innerHTML = "";
                                색깔후보 = 색깔들.slice();
                                색깔 = [];
                                완성카드 = [];
                                시작시간 = null;
                                셔플();
                                카드세팅(가로, 세로);
                            }
                        } else {
                            클릭플래그 = false;
                            setTimeout(function () {
                                클릭카드[0].classList.remove("flipped");
                                클릭카드[1].classList.remove("flipped");
                                클릭플래그 = true;
                                클릭카드 = [];
                            }, 1000);
                        }
                    }
                }
            });
        })(card);
        document.querySelector("#wrapper").appendChild(card);
    }
    // 카드를 외우도록 카드를 순서대로 알려준다.
    document.querySelectorAll(".card").forEach(function (card, index) {
        setTimeout(function () {
            card.classList.add("flipped");
        }, 1000 + 100 * index);
    });

    // 5초 뒤에 다시 뒤집는다
    setTimeout(function () {
        document.querySelectorAll(".card").forEach(function (card, index) {
            card.classList.remove("flipped");
        });
        클릭플래그 = true;
        시작시간 = new Date();
    }, 4000);
}

셔플();
카드세팅(가로, 세로);
