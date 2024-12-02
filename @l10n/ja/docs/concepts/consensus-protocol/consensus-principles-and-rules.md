---
html: consensus-principles-and-rules.html
parent: consensus.html
seo:
    description: XRP Ledgerは世界規模の決済システムで、ユーザはメールを送るときのようにスムーズに国境を越えて送金することができます。
labels:
  - ブロックチェーン
---
# コンセンサスの原理とルール

XRP Ledgerは世界規模の決済システムで、ユーザはメールを送るときのようにスムーズに国境を越えて送金することができます。Bitcoinなどの他のピアツーピア決済ネットワークと同様に、XRP Ledgerでは分散型コンピュータネットワークを介したピアツーピア取引の決済が可能です。他のデジタル通貨プロトコルとは異なり、XRP LedgerではXRP（XRP Ledgerのネイティブ資産）の他にユーザが選択した通貨（法定通貨、デジタル通貨、その他の価値形態など）建てでトランザクションを実行できます。

XRP Ledgerのテクノロジーにより、ほぼリアルタイムでの決済（3～6秒）が可能です。また、その分散型取引所により自動的に最も安価な通貨取引注文を決済に適用して通貨をブリッジングすることができます。

# 背景

## 仕組み

根本的には、XRP Ledgerはアカウント、残高、および資産取引オファーなどの情報を記録する共有データベースです。「トランザクション」と呼ばれる署名付きの指示により、アカウントの作成、支払いの実行、資産の取引などの変更が行われます。

暗号化システムであるため、XRP Ledgerアカウントの所有者は _暗号ID_ により識別されます。暗号IDは、公開鍵/秘密鍵のペアに相当します。トランザクションは、暗号IDに一致する暗号署名によって承認されます。すべてのサーバでは、同一の確定的な既知のルールに基づいてすべてのトランザクションが処理されます。最終的な目標は、ネットワーク内のすべてのサーバがまったく同じレジャー状態の完全なコピーを保有できるようにし、1つの中央機関がトランザクションを調停する必要がないようにすることです。


## 二重支払いの問題

「二重支払い」の問題は、どのような決済システムの運用においても根本的な課題となります。この問題は、ある場所でお金を支払うときに、別の場所ではそのお金を支払うことができないという要件に起因しています。一般的には、2つのトランザクションがあり、いずれかのトランザクションが有効で、両方が同時に有効になることがない場合にこの問題が発生します。

たとえば、Alice、Bob、Charlieが決済システムを使用しており、Aliceの残高が$10であるとします。この決済システムが機能するためには、Aliceはこの$10をBobまたはCharlieに送金できる必要があります。ただしAliceがBobに$10を送金し、同時にCharlieにも$10を送金しようとすると、二重支払いの問題が発生します。

Aliceが「同じ」$10をCharlieとBobの両方に送金できてしまう場合、この決済システムは正しく機能したとはいえなくなります。決済システムでは、発生したトランザクションについてすべての参加者が合意できるように、成功すべきトランザクションと失敗すべきトランザクションを選択する手段が必要です。これら2つのトランザクションはいずれも、トランザクションとしては同じく有効です。ただし、どのトランザクションが最初に発生したかについては、決済システムの参加者によって見方が異なります。

従来、決済システムでは中央機関がトランザクションを追跡、承認することで、この二重支払いの問題が解決されてきました。たとえば銀行は唯一の管理人として、保有する小切手振出人の預金残高に基づいて小切手を決済します。このようなシステムでは、すべての参加者が中央機関の決定に従う必要があります。

XRP Ledgerなどの分散型台帳技術では中央機関が存在せず、二重支払いの問題を他の方法で解決する必要があります。


# コンセンサスの仕組み

## 問題の単純化

二重支払いの問題のほとんどは、既知のルール（アカウントが保有していない資金を利用することを禁止するなど）により解決できます。実際に、二重支払いの問題はトランザクションを順に整理することで削減できます。

BobとCharlieの両方に同じ$10を送金しようとしたAliceの例で説明します。Bobへの支払いが最初であることが判明している場合は、AliceにはBobに支払う資金があることで全員が合意できます。Charlieへの支払いが2番目であることが判明している場合は、資金はすでにBobに送金されたため、Charlieには資金を送金できないことで全員が合意できます。

また、確定的なルールに基づいてトランザクションを順に並べることもできます。トランザクションはデジタル情報の集合であるため、コンピュータで簡単にソートできます。

中央機関なしに二重支払いの問題を解決するにはこれで十分ですが、トランザクションの結果を確認する前に、発生するすべてのトランザクションを把握し、ソートする必要があります。これは明らかに非現実的です。 <!-- STYLE_OVERRIDE: obviously -->

トランザクションをグループにまとめ、グループ単位で合意できる場合には、グループ内でトランザクションをソートできます。ひとまとめで処理するトランザクションについて参加者全員が合意している限り、中央機関を必要とすることなく、確定的なルールに基づいて二重支払いの問題を解決できます。各参加者がトランザクションをソートし、既知のルールに従い確定的な方法でそれらのトランザクションを適用します。XRP Ledgerでは、二重支払いの問題をこの方法で解決します。

XRP Ledgerでは、合意されたグループに複数の競合するトランザクションを含めることができます。トランザクションのグループは確定的なルールに従って実行されるので、ソートルールに基づいて最初に発生したトランザクションが成功し、2番目に発生した競合するトランザクションは失敗します。

## コンセンサスルール

コンセンサスの主な役割は、プロセスの参加者が、二重支払いの問題を解決するためグループ単位で処理するトランザクションについて合意を形成できるようにすることです。次の4つの理由により、この合意の形成は予想以上に容易です。

1. トランザクションをトランザクショングループに含めてはならない理由が特にない場合、すべての公正な参加者はそのトランザクションをグループに含めることで合意します。すべての参加者がすでに合意している場合、コンセンサスが果たす役割はありません。
2. トランザクションをトランザクショングループに含めてはならない何らかの理由がある場合、すべての公正な参加者はそのトランザクションの除外を希望します。トランザクションがまだ有効であり、次のラウンドに含めてはならない理由が特にない場合は、そのトランザクションを次のラウンドに含めることで全員が合意します。
3. トランザクションをグループ化する方法に参加者が特に関心を示すことは極めてまれです。合意の形成は、参加者全員がこれを最優先と認識している場合は最も容易になされ、参加者の関心が異なる場合に限り難しくなります。
4. 確定的なルールはグループ編成時にも使用でき、エッジケースについてのみ不合意を形成します。たとえば、ラウンドに2つの競合するトランザクションがある場合、確定的なルールを使用して次のラウンドに含めるトランザクションを決定できます。

すべての参加者は正確さを最も重視します。共有レジャーの整合性を損なわないようにするため、最初にこれらのルールを適用する必要があります。たとえば、適切な署名がないトランザクションは（他の参加者が処理を希望する場合でも）処理されることはありません。ただし、公正な参加者全員が2番目に重視するのは合意です。二重支払いが発生する可能性のあるネットワークはまったく役に立ちません。公正な参加者全員が正確さの次に重視するのが合意であるという事実により、合意が促進されます。

## コンセンサスラウンド

コンセンサスラウンドとは、トランザクションのグループについての合意形成に向けた取り組みで、これによりトランザクションの処理を可能とします。コンセンサスラウンドでは、合意形成を希望する各参加者が最初の見解を表明します。これは、参加者が確認した有効なトランザクションセットです。

次に、合意に向けて、参加者の見解が「次々に寄せられます」。特定のトランザクションが過半数の支持を得られない場合、参加者はそのトランザクションの保留に合意します。特定のトランザクションが過半数の支持を得ている場合、参加者はそのトランザクションを追加することに合意します。このように、支持が過半数をわずかに上回れば即座に全面的に支持され、過半数をわずかに下回れば即座に現行ラウンドでは全面的に却下されることになります。

コンセンサスが50%前後で行き詰まることを防ぎ、確実な合意を形成する上で必要となる重複を低減するため、トランザクションの追加に関する所定のしきい値は時間の経過とともに増加します。最初は、50%以上の他の参加者が合意していれば、参加者はトランザクションの追加についての合意の継続を支持します。参加者が合意しない場合、このしきい値が増加します。最初は60%に増加し、その後は問題のトランザクションが現行セットから削除されるまで増加し続けます。このようにして除外されたトランザクションはすべて次のレジャーバージョンに繰り越されます。

次に処理するトランザクションセットについて圧倒的多数が合意し、参加者がこれを確認した場合は、コンセンサスに達したと宣言します。

## コンセンサス失敗の可能性

完全なコンセンサスの達成に失敗することがないコンセンサスアルゴリズムの開発は非現実的です。その理由を理解するため、コンセンサスプロセスがどのように終了するかについて説明します。各参加者はある時点で、コンセンサスに達し、特定のトランザクションセットがそのコンセンサスプロセスの結果であると宣言する必要があります。この宣言により参加者は、特定のトランザクションセットがコンセンサスプロセスの結果であると取り消し不能の表明をすることになります。

いずれかの参加者がこの宣言を最初に行う必要があります。この宣言を行なう参加者がいなければ、合意に達することができません。次に、この宣言を最初に行う参加者について説明します。最初に宣言を行う参加者が、コンセンサスは完了したと判断した時点では、他の参加者はまだそのような判断に至っていません。もし他の参加者が各自の視点をもとに合意済のセットを変更できないのであれば、最初の宣言が行われた時点で、他の参加者はコンセンサスは完了したと判断していたでしょう。したがって、参加者は合意済のセットを変更できるはずです。 <!-- STYLE_OVERRIDE: will -->

つまり、コンセンサスプロセスを完了するには、その他のすべての参加者が合意済のトランザクションセットを理論的に変更できる場合でも、特定の参加者がトランザクションセットについてコンセンサスに達したことを宣言する必要があります。

たとえば、あるグループが部屋の中でどのドアから外に出るかについて合意しようとしている場合を考えてください。参加者がどれほど話し合っても、ある時点で _誰か_ が最初にドアから外に出なければなりません。これは、その後に続く人々が考えを変えて別のドアから外に出ることができるとしてもです。

このような失敗が生じる確率を低く抑えることはできますが、ゼロにすることはできません。技術上のトレードオフとして、この確率を1000分の1未満に抑えると、コンセンサスにかかる時間が非常に長くなり、ネットワークとエンドポイントの障害に対する耐性が低くなります。

## XRP Ledgerでのコンセンサス失敗の処理

コンセンサスラウンドが完了したら、各参加者は、合意に達したと各自が理解しているトランザクションのセットを適用します。その結果、レジャーの次の段階と各自が想定しているものが生成されます。

バリデータでもある参加者が、次のレジャーの暗号フィンガープリントを公開します。このフィンガープリントを「検証投票」と呼びます。コンセンサスラウンドが成功した場合、公正なバリデータの過半数が同じフィンガープリントを公開します。

次に参加者がこれらの検証投票を収集します。検証投票から、参加者は前のコンセンサスラウンドの結果、参加者の圧倒的多数がトランザクションセットについて合意しているか否かを確認できます。

参加者は次の3つのいずれかの状況になります（確率の高い順）。

1. 圧倒的多数が合意したレジャーと同じレジャーを構築します。この場合、参加者はそのレジャーが完全に検証済みであると見なし、その内容を信頼できます。
2. 圧倒的多数が合意したレジャーとは異なるレジャーを構築します。この場合、参加者は圧倒的多数が合意したレジャーを構築して受け入れる必要があります。これは通常、参加者が早期にコンセンサスを宣言した後、他の多くの参加者が考えを変えたことを意味します。圧倒的多数が合意したレジャーに「ジャンプ」して操作を再開する必要があります。
3. 受信した検証からは圧倒的多数が明確ではありません。この場合、前のコンセンサスラウンドが無駄となったため、いずれかのレジャーが検証される前に新しいラウンドが発生する必要があります。

ケース1が最も一般的に発生する状況です。ケース2はネットワークに一切悪影響を及ぼしません。ごく少数の参加者は、あらゆるラウンドでケース2の状況になることがありますが、ネットワークは特に問題なく動作します。このような参加者も、構築したレジャーが圧倒的多数が支持するレジャーと同じでなかったことを認識できるので、圧倒的多数との合意に達するまでは、その結果を最終結果として報告してはならないことを理解しています。

ケース3では、ネットワークは数秒間遅滞する結果となります。この間に処理を進められる可能性はありますが、非常にまれです。このケースでは、意見の相違はコンセンサスプロセスで解決され、未解決のまま残っている意見の相違のみが失敗の原因となるため、次のコンセンサスラウンドが失敗する可能性は大幅に低下します。

まれに、ネットワーク全体が数秒間にわって処理を進めることができないことがあります。その代わり、トランザクションの平均確認時間は短くなります。

# 理念

信頼性の1つの要素として、一部のコンポーネントで障害が発生している、悪意のある参加者がいるなどの状況でも結果を提供できるというシステムの能力があげられます。この点は重要ですが、暗号決済システムに関してはこれよりもさらに重要なもう1つの信頼性の要素があります。それは、信頼できる結果を提供するシステムの能力です。つまり、システムが結果を信頼できるものとして報告する場合、その結果を信頼できなければなりません。

ただし実際のシステムは、この両方の信頼性が損なわれる可能性のある運用状況に直面します。このような状況には、ハードウェア障害、通信障害、不正な参加者などがあります。XRP Ledgerの設計理念の1つとして、信頼してはならない結果を提供するのではなく、結果の信頼性が損なわれている状況を検知し、報告することを掲げています。

XRP Ledgerのコンセンサスアルゴリズムは、プルーフオブワークシステムに代わる堅牢な仕組みで、コンピューティングリソースを不必要に消費することはありません。ビザンチン障害が発生する可能性があり、また実際に発生することがありますが、その影響はわずかな遅延にとどまります。どのケースでも、XRP Ledgerのコンセンサスアルゴリズムは、結果が実際に信頼できるものである場合にのみ、信頼できる結果として報告します。