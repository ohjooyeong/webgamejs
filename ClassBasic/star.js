for (var star = 1; star <= 5; star += 1) {
    console.log("*".repeat(star));
}

for (var star = 5; star >= 1; star -= 1) {
    console.log("*".repeat(star));
}

for (var star = 10; star >= 2; star -= 2) {
    console.log("*".repeat(star));
}

for (var star = 1; star <= 16; star *= 2) {
    console.log("*".repeat(star));
}

for (var star = 5; star >= 1; star -= 1) {
    console.log(" ".repeat(5 - star) + "*".repeat(star));
}

for (var star = 9; star >= 1; star -= 2) {
    console.log(" ".repeat((9 - star) / 2) + "*".repeat(star));
}
// *********
//  *******
//   *****
//    ***
//     *

for (var star = 0; star < 5; star += 1) {
    console.log("*".repeat(star + 1));
}

for (var star = -2; star <= 2; star += 1) {
    console.log(
        " ".repeat(Math.abs(star)) + "*".repeat(5 - Math.abs(star) * 2)
    );
}
//    *
//   ***
//  *****
//   ***
//    *
