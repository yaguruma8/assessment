'use strict';

const answers = [
    '{username}のいいところは声です。{username}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{username}のいいところはまなざしです。{username}に見つめられるとドキドキします。',
    '{username}のいいところは情熱です。{username}の情熱に周囲は感化されます。',
    '{username}のいいところは厳しさです。{username}の厳しさが物事を成功に導きます。',
    '{username}のいいところは知識です。博識な{username}を多くの人が頼りにします。',
    '{username}のいいところはユニークさです。{username}だけのその特長が皆を楽しくさせます。',
    '{username}のいいところは決断力です。{username}がする決断にいつも助けられる人がいます。',
    '{username}のいいところは思いやりです。{username}に気にかけてもらった多くの人が感謝します。',
    '{username}のいいところは節度です。強引すぎない{username}の考えに皆が共感します。',
    '{username}のいいところは好奇心です。新しいことに向かっていく{username}が魅力的に映ります。',
    '{username}のいいところは自制心です。しっかりと衝動を抑えられる{username}が評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
];

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');

userNameInput.onkeydown = (e) => {
    if (e.key === 'Enter') {
        assessmentButton.onclick();
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) return;
    
    // 診断結果エリアの作成
    const resultArea = document.getElementById('result-area');
    removeAllChildren(resultArea);
    const header = document.createElement('h2');
    header.innerText = '診断結果';
    resultArea.appendChild(header);
    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultArea.appendChild(paragraph);

    // tweetエリアの作成
    const tweetArea = document.getElementById('tweet-area');
    removeAllChildren(tweetArea);
    // aタグ
    const anchor = document.createElement('a');
    const hrefValue = `https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent(
        'あなたのいいところ'
    )}&ref_src=twsrc%5Etfw`;
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.setAttribute('data-show-count', 'false');
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetArea.appendChild(anchor);
    // scriptタグ
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetArea.appendChild(script);
};

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (const char of userName) {
        sumOfCharCode = sumOfCharCode + char.charCodeAt(0);
    }
    const index = sumOfCharCode % answers.length;
    // answersのusernameを引数のuserNameに置き換える
    let result = answers[index];
    result = result.replace(/\{username\}/g, userName);
    return result;
}

/**
 * 指定した要素の子要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// test
console.log(assessment('太郎'));
console.assert(
    assessment('太郎') ===
        '太郎のいいところはまなざしです。太郎に見つめられるとドキドキします。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前ならば同じ診断結果を出力する処理が正しくありません'
);
