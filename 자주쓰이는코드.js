var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; // splice는 배열을 가져오기 때문에 [0]을 쓴다.
// == 비슷하다. 위에는 배열을 반환하며 [0] 을 했지만 여기는 concat함수를 써서 배열을 없애준다.
색깔 = 색깔.concat(색깔후보.splice(Math.floor(Math.random() * 색깔후보.length), 1));

var dict = {
    바위: "4px",
    가위: "-142px",
    보: "-280px",
};
// Object.entries() 는 딕셔너리를 2차원배열로 바꿔준다. 이렇게 [["바위", "4px"],["가위", "-142px"],["보", "-280px"]]
function computerChoice(pos) {
    return Object.entries(dict).find(function (v) {
        // find도 반복문의 일종이다. 중첩을 줄이자
        return v[1] === pos;
    })[0];
}

// 객체복사코드 (불완전함) 1단계만 복사
var obj = { a: 1, b: 2, c: 3 }; // 복사할 객체
var obj2 = {}; // 넣을 객체

// Object.keys 메서드는 객체의 속성명들을 배열로 바꿉니다. ["a", "b", "c"]
Object.keys(obj).forEach(function (key) {
    obj2[key] = obj[key];
});

//객체의 객체를 복사하는 코드 (불완전함) 예외가 있음
function copyObj(obj) {
    var copy = {};
    if (typeof obj === "object" && obj !== null) {
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = copyObj(obj[attr]);
            }
        }
    } else {
        copy = obj;
    }
    return copy;
}
var obj2 = copyObj(obj);

var arr1 = [1, 2, 3];
var arr2 = arr1.slice(); // 1단계만 복사, 나머지는 참조

// 쉽고 간편한 객체를 복사하는 코드 하지만 복사 성능 최악
// prototype은 복사 불가능하다.
obj2 = JSON.parse(JSON.stringify(obj));

//객체 내부에 __proto__는 생략을 해도 된다.
var card = {
    name: "oh",
    att: 10,
    hp: 10,
};
var proto = {
    type: "카드",
    attack: function () {},
    defend: function () {},
};

card.__proto__ = prototype;

console.log(card.type); // 카드
console.log(card.attack); // function()

var 프로토타입 = {
    type: "카드",
    attack: function () {},
    defend: function () {},
};

function 카드공장(name, att, hp) {
    var 카드 = {
        name: name,
        att: att,
        hp: hp,
    };
    카드.__proto__ = 프로토타입;
    return 카드;
}
//card.__proto__ = prototype; 이 방법은 쓰면 안된다.

// 팩토리 패턴 구현.
// 다음 방법이 표준
var 프로토타입 = {
    type: "카드",
    attack: function () {},
    defend: function () {},
};

function 카드공장(name, att, hp) {
    var 카드 = Object.create(프로토타입);
    카드.name = name;
    카드.att = att;
    카드.hp = hp;
    return 카드;
}

Object.keys(obj).forEach(function (key) {
    obj2[key] = obj[key];
});
// = 같은 방식을 진행하는 코드 1단계 복사
Object.assign(obj2, obj);

// 생성자 return 값이 없음. new 를 써서 객체를 만들 수 있다.
// this 여기서 생성자 만들때 new를 빼면 this가 window객체를 가리킴
function Card(name, att, hp) {
    "use strict"; // 엄격 모드 this가 window를 가리키지 못하게 한다.
    this.name = name;
    this.att = att;
    this.hp = hp;
}
Card.prototype = 프로토타입;

var joo = new Card("oh", 5, 10);

// 0 ~ 숫자-1 까지 쉽게 배열로 하는법 [0, 1, 2, 3, ..., 숫자-1]
[...Array(숫자).keys()];

// 조건을 걸고 0 ~ 숫자 까지쉽게 배열로 하는법
// [1, 2, 3, 4, ..., 숫자]
[...Array(숫자).keys()].map((v) => v + 1);
