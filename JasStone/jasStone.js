var 상대 = {
    영웅: document.querySelector("#rival-hero"),
    덱: document.querySelector("#rival-deck"),
    필드: document.querySelector("#rival-cards"),
    코스트: document.querySelector("#rival-cost"),
    덱data: [],
    영웅data: [],
    필드data: [],
    선택카드: null,
    선택카드data: null,
};

var 나 = {
    영웅: document.querySelector("#my-hero"),
    덱: document.querySelector("#my-deck"),
    필드: document.querySelector("#my-cards"),
    코스트: document.querySelector("#my-cost"),
    덱data: [],
    영웅data: [],
    필드data: [],
    선택카드: null,
    선택카드data: null,
};

var 턴 = true;
var 턴버튼 = document.querySelector("#turn-btn");

function 덱에서필드로(데이터, 내턴) {
    var 객체 = 내턴 ? 나 : 상대; //조건 ? 참 : 거짓
    var 현재코스트 = Number(객체.코스트.textContent);
    if (현재코스트 < 데이터.cost) {
        return "end";
    }
    var idx = 객체.덱data.indexOf(데이터);
    객체.덱data.splice(idx, 1);
    객체.필드data.push(데이터);
    객체.덱.innerHTML = "";
    객체.필드.innerHTML = "";
    객체.필드data.forEach(function (data) {
        카드돔연결(data, 객체.필드);
    });
    객체.덱data.forEach(function (data) {
        카드돔연결(data, 객체.덱);
    });
    데이터.field = true;
    객체.코스트.textContent = 현재코스트 - 데이터.cost;
}

function 화면다시그리기(내화면) {
    var 객체 = 내화면 ? 나 : 상대; //조건 ? 참 : 거짓
    객체.덱.innerHTML = "";
    객체.필드.innerHTML = "";
    객체.영웅.innerHTML = "";
    객체.필드data.forEach(function (data) {
        카드돔연결(data, 객체.필드);
    });
    객체.덱data.forEach(function (data) {
        카드돔연결(data, 객체.덱);
    });
    카드돔연결(객체.영웅data, 객체.영웅, true);
}

function 카드돔연결(데이터, 돔, 영웅) {
    var 카드 = document.querySelector(".card-hidden .card").cloneNode(true);
    카드.querySelector(".card-cost").textContent = 데이터.cost;
    카드.querySelector(".card-att").textContent = 데이터.att;
    카드.querySelector(".card-hp").textContent = 데이터.hp;
    if (영웅) {
        카드.querySelector(".card-cost").style.display = "none";
        var 이름 = document.createElement("div");
        이름.textContent = "영웅";
        데이터.field = true;
        카드.appendChild(이름);
    }
    카드.addEventListener("click", function () {
        if (턴) {
            //턴이 끝난 카드면 아무일도 일어나지 않음
            if (카드.classList.contains("card-turnover")) {
                return;
            }
            if (!데이터.mine && 나.선택카드) {
                // 상대 카드면서 내 카드가 선택되어 있고,
                // 또 그게 턴이 끝난 카드가 아니면 상대를 공격
                데이터.hp = 데이터.hp - 나.선택카드data.att;
                화면다시그리기(false);
                나.선택카드.classList.remove("card-selected");
                나.선택카드.classList.add("card-turnover");
                나.선택카드 = null;
                나.선택카드data = null;
                return;
            }
            // 내 턴이면 카드를 뽑고
            else if (!데이터.mine) {
                // 상대 카드면
                return;
            }
            if (데이터.field) {
                // 필드에 있으면
                카드.parentNode.querySelectorAll(".card-selected").forEach(function (card) {
                    card.classList.remove("card-selected");
                });
                카드.classList.add("card-selected");
                나.선택카드 = 카드;
                나.선택카드data = 데이터;
            } else {
                // 덱이 있으면
                if (덱에서필드로(데이터, true) !== "end") {
                    내덱생성(1);
                }
            }
        } else {
            if (카드.classList.contains("card-turnover")) {
                return;
            }
            if (데이터.mine && 상대.선택카드) {
                // 상대 카드면서 내 카드가 선택되어 있고,
                // 또 그게 턴이 끝난 카드가 아니면 상대를 공격
                데이터.hp = 데이터.hp - 상대.선택카드data.att;
                화면다시그리기(true);
                상대.선택카드.classList.remove("card-selected");
                상대.선택카드.classList.add("card-turnover");
                상대.선택카드 = null;
                상대.선택카드data = null;
                return;
            }
            // 상대 턴인데
            else if (데이터.mine) {
                // 내 카드거나 필드에 있으면
                return;
            }
            if (데이터.field) {
                // 필드에 있으면
                카드.parentNode.querySelectorAll(".card-selected").forEach(function (card) {
                    card.classList.remove("card-selected");
                });
                카드.classList.add("card-selected");
                상대.선택카드 = 카드;
                상대.선택카드data = 데이터;
            } else {
                // 덱이 있으면
                if (덱에서필드로(데이터, false) !== "end") {
                    상대덱생성(1);
                }
            }
        }
    });
    돔.appendChild(카드);
}

function 상대덱생성(개수) {
    for (var i = 0; i < 개수; i++) {
        상대.덱data.push(카드공장());
    }
    상대.덱.innerHTML = "";
    상대.덱data.forEach(function (data) {
        카드돔연결(data, 상대.덱);
    });
}
function 내덱생성(개수) {
    for (var i = 0; i < 개수; i++) {
        나.덱data.push(카드공장(false, true));
    }
    나.덱.innerHTML = "";
    나.덱data.forEach(function (data) {
        카드돔연결(data, 나.덱);
    });
}
function 내영웅생성() {
    나.영웅data = 카드공장(true, true);
    카드돔연결(나.영웅data, 나.영웅, true);
}
function 상대영웅생성() {
    상대.영웅data = 카드공장(true);
    카드돔연결(상대.영웅data, 상대.영웅, true);
}

function Card(영웅, 내카드) {
    if (영웅) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.floor(Math.random() * 2) + 25;
        this.hero = true;
    } else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if (내카드) {
        this.mine = true;
    }
}

function 카드공장(영웅, 내카드) {
    return new Card(영웅, 내카드);
}

function 초기세팅() {
    상대덱생성(5);
    내덱생성(5);
    내영웅생성();
    상대영웅생성();
}

턴버튼.addEventListener("click", function () {
    var 객체 = 턴 ? 나 : 상대;
    객체.필드.innerHTML = "";
    객체.영웅.innerHTML = "";
    객체.필드data.forEach(function (data) {
        카드돔연결(data, 객체.필드);
    });
    카드돔연결(객체.영웅data, 객체.영웅, true);

    턴 = !턴;

    if (턴) {
        나.코스트.textContent = 10;
    } else {
        상대.코스트.textContent = 10;
    }
    document.querySelector("#rival").classList.toggle("turn");
    document.querySelector("#my").classList.toggle("turn");
});

초기세팅();
