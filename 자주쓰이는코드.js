var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; // splice는 배열을 가져오기 때문에 [0]을 쓴다.
// == 비슷하다. 위에는 배열을 반환하며 [0] 을 했지만 여기는 concat함수를 써서 배열을 없애준다.
색깔 = 색깔.concat(
    색깔후보.splice(Math.floor(Math.random() * 색깔후보.length), 1)
);

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
