
# オブジェクト指向
# 現実の物事を、プログラムの世界に落とし込む考え方
class Money(object):
    
    def __init__(self, value: int, unit: str):
        self.value = value
        self.unit = unit

money = Money(value=100, unit="円") # => Moneyの中にある __init__ が呼ばれる 
# 初期化、イニシャライザ、コンストラクタ ... 対象のクラスを作り出す => インスタンス化

print(money.value, money.unit)

"""JS版
class Money {

    constructor(value, unit) {
        this.value = value
        this.unit = unit
    }
}

const cookie = new Money(100, "円")
console.log(cookie)
"""