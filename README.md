# Scratch-Stats-Bot

<img src="images/ssb-banner.png">

<b><big>目次</big></b>

[<img width="175" height="66" src="images/what-ssb.png">](#whatssb)
[<img width="175" height="66" src="images/update-history.png">](#update)
[<img width="175" height="66" src="images/conditions-terms.png">](#terms)
[<img width="175" height="66" src="images/privacypolicy.png">](#policy)
<a id="howintroduce"><img width="175" height="66" src="images/how-introduce.png"></a>

<h2><a id="whatssb">Scratch Stats Bot とは</a></h2><br>
Scratchに特化したScratchユーザーのためにBotです。<br>
現時点で多くのコマンドを有しています。<br>
動作に特別な権限は必要ありません。<br>
いつでも気軽に<a href ="https://discord.gg/wRdXB8MBt6">サポートサーバー</a>で質問や要望を出してください！

<h2><a id="update">更新履歴</a></h2><br>
2023/10/17 rankの追加、API復活<br>
2023/10/19 stats、rankがNew Scratcherに対応していなかった問題を修正<br>
2023/10/21 rankの順位がすべて○thで表示されていたものを1st、2nd、3rdなどと変更<br>
2024/03/08 infoをdiscord上から変更できるように変更<br>
2024/03/09 infoの情報を毎分更新するように変更、オンライン表示の基準を設定<br>
2024/03/11 infoの更新を再起動時のみに変更<br>
2024/03/13 statsの内容の一部変更、使用するAPIを変更<br>
2024/04/06 Scracth Stats Botのバージョンを設定、バージョンの再計算<br>
2024/04/21 statsのバグ(永遠ロード)を修正、statsのStatusがScratcherかScratch Teamに変更、explore(傾向)の実装<br>
2024/04/29 discord.jsのアップデートに対応、exploreのUIを変更<br>
2024/05/03 rankを削除、projectを追加、statsの年月日表示の変更<br>
2024/05/07 embedフォルダの削除による簡略化<br>
2024/05/08 statsの再発永遠ロードバグの修正<br>
2024/05/11 infoに定期再起動予定時刻を追加<br>
2024/05/15 statsで絵文字のユーザーを検索するとエラー落ちするのを解決<br>
2024/05/25 searchの追加、プロジェクト関連にidを追加、statsに注目のプロジェクト追加、exploreの細かな修正<br>
2024/06/22 DMで要望等を受けられる機能を追加<br>
2024/06/23 DMでの受信での削除機能の改善<br>
2024/06/26 DMでの送信機能を追加、送信可能文字数を200文字に設定<br>
2024/06/27 statsでフォロワー数が正しく表示されない不具合を修正、statsの注目のプロジェクトが取得できなかった場合エラー画像を送信するように変更<br>
2024/07/07 コマンド全般のエラー処理を修正<br>
2024/07/08 statsでのエラーを他人に見えないように変更、projectの検索がURLからもできるように変更<br>

<h2><a id="terms">利用規約</a></h2><br>
2024年7月12日 制定<br><br>

この利用規約 (以下、本規約といいます。) は、Scratch Stats Bot (以下、「本サービス」といいます。) の利用条件等を制定するものです。本サービスの使用者は、本規約に従って本サービスを使用することができます。<br>

<h3>第1条 適用</h3>
1.本サービスをサーバーに導入・利用することで、利用者には本規約に同意したとみなされます。本規約に同意しない場合、本サービスを使用することはできません。<br>
2.本規約は、アナウンスなしに改定されることがあります。<br>
3.本規約が前条の個別規定の規定と矛盾する場合は、特段の定めが無い限り、個別規定の規定が優先されるものとします。<br>

<h3>第2条 禁止事項</h3>
利用者は、本サービスに対して下記に該当または関係する行為を行ってはいけません。<br><br>

1.法令または公序良俗に違反する行為<br>
2.犯罪行為に関連する行為<br>
3.Discordの利用規約やコミュニティガイドラインに違反する行為<br>
4.本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為<br>
5.本サービスによって得られた情報や使用できる機能を商業的に利用する行為<br>
6.本サービスが稼働されているサーバーへDos攻撃、DDos攻撃などを使用してサーバーを攻撃する行為<br>
7.本サービスで発生しているバグを悪用する行為<br>
8.不正な目的を持って本サービスを使用する行為<br>

<h3>第3条 処罰</h3>
第2条に違反する行為を行った場合や、開発者の管理するサーバーに対して規約違反等を起こした際、開発者は、該当者またはサーバーに対して以下の処罰を加えることができるものとします。<br><br>

・該当サーバーでの使用の制限 (一時的、または永続的)<br>
・該当者が管理するすべてのサーバーでの使用の制限 (一時的、または永続的)<br>

<h3>第4条 免責事項</h3>
本サービスはプログラム上での重大な過失を除き、本サービスの利用した際に発生したあらゆる損害は一切責任を負わないものとします。<br>

<h3>第5条 データの取扱い</h3>
本サービスを使用する上で保存されたデータは、<a href="#policy">プライバシーポリシー</a>に基づいて取り扱われるものとします。<br>

<h3>第6条 本サービスの提供の停止</h3>
当者は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく、本サービスの一部または一部の提供を停止または中断することができるものとします。<br><br>

1.プログラムのアップデートやメンテナンスを行う場合<br>
2.自然災害等による不可抗力により、本サービスの提供が困難となった場合<br>
3.コンピュータまたは通信回線等が事故により停止した場合<br>
4.その他、当者が本サービスの提供が困難と判断した場合<br>

<h2><a id="policy">プライバシーポリシー</a></h2><br>
2024年7月12日 制定<br><br>

本プライバシーポリシーは、Scratch Stats Bot (以下本サービス) を使用する上でのデータの取り扱いの方針を明文化したものです。<br>

<h3>第1条 適用</h3>
本プライバシーポリシーは、本サービスに適用されるものとし、DEMO-VERSION等限定公開されている派生サービスには適用されないものとします。<br>
また、本プライバシーポリシーは今後のBOTの開発状況によってアナウンスなく改定される場合がございます。<br>

<h3>第2条 収集する情報</h3>
本サービスは、本サービスに搭載された機能を使用する場合や本サービスのセキュリティ向上のために、以下の情報を収集し、使用する場合があります。<br><br>

・コマンドが実行されたサーバーID<br>
・導入したサーバーのID、名前、所有者のID<br>

<h3>第3条 保存する情報</h3>
本サービスは、設定の保存や本サービスの管理のために以下の情報をDiscordから取得し、保存する場合があります。<br><br>

・ユーザーID<br>
・`` /stats ``で入力したユーザー名<br>
・`` /project `` で入力したプロジェクトIDまたは、URL<br><br>
尚、保存した情報は暗号化されず保存されます。<br>

<h3>第4条 情報の取り扱い</h3>
本サービスが保存した情報は、本サービスに搭載している機能を使用する場合のみ使用し、データベース以外のプラットフォームやサービス、ユーザーには送信・公開いたしません。<br>
ただし、外部APIを使用した機能では、API開発元のプライバシーポリシーが優先されるものとします。<br>

<a href = "https://discord.com/api/oauth2/authorize?client_id=1078409540392992981&permissions=10448581814336&scope=bot%20applications.commands"><b>Botを導入する</b></a><br>
<a href = "https://discord.gg/wRdXB8MBt6"><b>サポートサーバー</b></a><br>


メモ<br>
Playing : プレイ中<br>
Streaming : Twitchでライブ<br>
Listening : 再生中<br>
Watching : 視聴中<br>
Custom : カスタムステータス<br>
Competing : 参戦中です<br>
<br>
online : オンライン<br>
idle : 退席中<br>
dnd : 応答不可<br>
invisibility : 表示なし
