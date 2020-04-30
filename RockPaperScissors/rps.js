var imagePosition = "4px";
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

var 인터벌;
function IntervalMaker() {
    인터벌 = setInterval(function () {
        if (imagePosition == dict.바위) {
            imagePosition = dict.가위;
        } else if (imagePosition == dict.가위) {
            imagePosition = dict.보;
        } else {
            imagePosition = dict.바위;
        }
        document.querySelector("#computer").style.background =
            'url("https://sites.google.com/site/hafsrsp/_/rsrc/1468855017636/config/customLogo.gif?revision=2") ' +
            imagePosition +
            " 0";
    }, 50);
}

var dict1 = {
    바위: 0,
    가위: 1,
    보: -1,
};
IntervalMaker();
document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        clearInterval(인터벌);
        setTimeout(function () {
            IntervalMaker();
        }, 1000);
        var myChoice = dict1[this.textContent];
        var cpChoice = dict1[computerChoice(imagePosition)];
        if (myChoice === cpChoice) {
            console.log("비겼습니다.");
        } else if ([1, -2].includes(myChoice - cpChoice)) {
            // myChoice - cpChoice === 1 || myChoice - cpChoice === -2
            console.log("졌습니다.");
        } else {
            console.log("이겼습니다.");
        }
    });
});
