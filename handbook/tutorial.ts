// 타입 추론
const user0 = {
    name: 'seong hyeon',
    id: 0,
};

// 객체의 형태를 명시적으로 나타내기 위해 인터페이스 사용
interface User {
    name: string,
    id: number,
}

// JS 객체가 새로운 인터페이스의 형태를 따르고 있음을 선언
const user: User = {
    name: 'seong hyeon',
    id: 0,
};

// JavaScript는 클래스와 객체 지향 프로그래밍을 지원하기 때문에, TypeScript 또한 동일
// 인터페이스는 클래스로도 선언할 수 있음
class UserAccount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}

// 구조적 타이핑으로 인해 가능
const user2: User = new UserAccount('KSH', 31);

// 매개변수와 리턴 값 명시
function getAdminUser(): User {
    return new UserAccount('a', 1);
}

function deleteUser(user: User) {
    //
}

// boolean, bigint, null, number, string, symbol, object, undefined
// 타입 추가됨 : any, unknown, never

// type과 interface 중 interface를 우선적으로 사용하자

// Type Composition

// - Union
type MyBool = true | false;

type windowStates = 'open' | 'close' | 'minimize';
type LockStates = 'locked' | 'unlocked';
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]) {
    return obj.length;
}

// TypeScript는 코드가 시간에 따라 변수가 변경되는 방식을 이해하며, 
// 이러한 검사를 사용해 타입을 골라낼 수 있음

function wrapInArray(obj: string | string[]) {
    if (typeof obj === "string") {
        return [obj];
    } else {
        return obj;
    }
}

// 2. 제네릭(Generics)
// 제네릭은 타입에 변수를 제공하는 방법
// 배열이 일반적인 예시이며, 제네릭이 없는 배열은 어떤 것이든 포함할 수 있습니다. 제네릭이 있는 배열은 배열 안의 값을 설명할 수 있음
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

// => 제네릭을 사용하는 고유 타입을 선언 가능
interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

declare const backpack: Backpack<string>;

// type: string
const object = backpack.get();

// string만 추가 가능
backpack.add("123");

// 구조적 타입 시스템
interface Point {
    x: number;
    y: number;
}

function printPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}

const point = { x: 13, y: 15 };
printPoint(point); // 가능
// point 변수는 Point 타입으로 선언된 적이 없지만, 형태 비교 통과함

// 형태 일치에는 일치시킬 객체의 필드의 하위 집합만 필요함
const point3 = { x: 12, y: 26, z: 30 };
printPoint(point3); // 가능

const rect = { x: 33, y: 3, width: 30, height: 80 };
printPoint(rect); // 가능, prints 33, 3

const color = { hex: "#187ABF" };
// printPoint(color); // 에러

// 구조적으로 클래스와 객체가 형태를 따르는 방법에는 차이가 없다
class VirtualPoint {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const newVPoint = new VirtualPoint(13, 56);
printPoint(newVPoint); // 가능, prints 13, 56

