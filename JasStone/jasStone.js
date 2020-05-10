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
    필드다시그리기(객체);
    덱다시그리기(객체);
    데이터.field = true;
    객체.코스트.textContent = 현재코스트 - 데이터.cost;
}

function 필드다시그리기(객체) {
    객체.필드.innerHTML = "";
    객체.필드data.forEach(function (data) {
        카드돔연결(data, 객체.필드);
    });
}

function 덱다시그리기(객체) {
    객체.덱.innerHTML = "";
    객체.덱data.forEach(function (data) {
        카드돔연결(data, 객체.덱);
    });
}

function 영웅다시그리기(객체) {
    객체.영웅.innerHTML = "";
    카드돔연결(객체.영웅data, 객체.영웅, true);
}

function 화면다시그리기(내화면) {
    var 객체 = 내화면 ? 나 : 상대; //조건 ? 참 : 거짓
    필드다시그리기(객체);
    덱다시그리기(객체);
    영웅다시그리기(객체);
}

function 데이터삭제() {
    for (i = 0; i < 2; i++) {
        var 객체 = i ? 나 : 상대;
        객체.덱data = [];
        객체.영웅data = [];
        객체.필드data = [];
        객체.선택카드 = null;
        객체.선택카드data = null;
    }
    // [상대, 나].forEach(function (item) {
    //     item.덱data = [];
    //     item.영웅data = [];
    //     item.필드data = [];
    //     item.선택카드 = [];
    //     item.선택카드data = [];
    // });
}

function 턴액션수행(카드, 데이터, 내턴) {
    var 아군 = 내턴 ? 나 : 상대;
    var 적군 = 내턴 ? 상대 : 나;
    //턴이 끝난 카드면 아무일도 일어나지 않음
    if (카드.classList.contains("card-turnover")) {
        return;
    }
    var 적군카드 = 내턴 ? !데이터.mine : 데이터.mine;
    if (적군카드 && 아군.선택카드) {
        // 적군 카드면서 아군 카드가 선택되어 있고,
        // 또 그게 턴이 끝난 카드가 아니면 적군을 공격
        데이터.hp = 데이터.hp - 아군.선택카드data.att;
        if (데이터.hp <= 0) {
            // 카드가 죽었을 때
            var 인덱스 = 적군.필드data.indexOf(데이터);
            if (인덱스 > -1) {
                // 쫄병이 죽었을 때
                적군.필드data.splice(인덱스, 1);
            } else {
                // 영웅이 죽었을때
                alert("승리하셨습니다.");
                초기세팅();
                return;
            }
        }
        화면다시그리기(!내턴);
        아군.선택카드.classList.remove("card-selected");
        아군.선택카드.classList.add("card-turnover");
        아군.선택카드 = null;
        아군.선택카드data = null;
        return;
    }
    // 내 턴이면 카드를 뽑고
    else if (적군카드) {
        // 상대 카드면
        return;
    }
    if (데이터.field) {
        // 필드에 있으면
        //  영웅 부모와 필드카드의 부모가 다르기때문에 document에서 모든 .card를 검색한다
        // document.querySelectorAll(".card").forEach(function (card) {
        //     card.classList.remove("card-selected");
        // });
        카드.parentNode.querySelectorAll(".card-selected").forEach(function (card) {
            card.classList.remove("card-selected");
        });
        카드.classList.add("card-selected");
        아군.선택카드 = 카드;
        아군.선택카드data = 데이터;
    } else {
        // 덱이 있으면
        if (덱에서필드로(데이터, 내턴) !== "end") {
            내턴 ? 내덱생성(1) : 상대덱생성(1);
        }
    }
}

function 카드돔연결(데이터, 돔, 영웅) {
    var 카드 = document.querySelector(".card-hidden .card").cloneNode(true); // card-hidden에 있는 형식을 복사
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
        턴액션수행(카드, 데이터, 턴);
    });
    돔.appendChild(카드);
}

function 상대덱생성(개수) {
    for (var i = 0; i < 개수; i++) {
        상대.덱data.push(카드공장());
    }
    덱다시그리기(상대);
}
function 내덱생성(개수) {
    for (var i = 0; i < 개수; i++) {
        나.덱data.push(카드공장(false, true));
    }
    덱다시그리기(나);
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
    데이터삭제();
    상대덱생성(5);
    내덱생성(5);
    내영웅생성();
    상대영웅생성();
    화면다시그리기(true);
    화면다시그리기(false);
}

턴버튼.addEventListener("click", function () {
    var 객체 = 턴 ? 나 : 상대;
    document.querySelector("#rival").classList.toggle("turn");
    document.querySelector("#my").classList.toggle("turn");
    필드다시그리기(객체);
    영웅다시그리기(객체);

    턴 = !턴;

    if (턴) {
        나.코스트.textContent = 10;
    } else {
        상대.코스트.textContent = 10;
    }
});

초기세팅(); // 진입
