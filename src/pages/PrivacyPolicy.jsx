import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div style={{ padding: '24px', maxWidth: 720, margin: '0 auto', lineHeight: 1.7 }}>
      <h2>プライバシーポリシー</h2>

      <p>
        TABINAZO（以下「当サイト」）は、利用者の個人情報の保護に配慮し、
        以下の方針に基づき適切に取り扱います。
      </p>

      <h3>1. 収集する情報について</h3>
      <p>
        当サイトでは、問題の回答やアクセス解析のため、以下の情報を収集する場合があります。
      </p>
      <ul>
        <li>入力された回答データ</li>
        <li>IPアドレス・ブラウザ情報などのアクセス情報</li>
        <li>Cookie（クッキー）を利用した利用状況データ</li>
      </ul>
      <p>
        これらの情報は問題の運用・分析・広告の最適化に利用されます。
      </p>

      <h3>2. Google AdSense について</h3>
      <p>
        当サイトでは Google AdSense 広告を利用する場合があります。
        Google は Cookie を使用し、ユーザーの興味に応じた広告を表示することがあります。
      </p>
      <p>
        広告設定についての詳細は Google のポリシーをご確認ください：<br />
        <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noreferrer">
          https://policies.google.com/technologies/ads
        </a>
      </p>

      <h3>3. アクセス解析ツールについて</h3>
      <p>
        当サイトではアクセス解析のため、Google Analytics などの解析ツールを利用する場合があります。
        これらのツールはトラフィックデータの収集のために Cookie を使用します。
      </p>

      <h3>4. 個人情報の利用目的</h3>
      <p>取得した情報は以下の目的で利用します。</p>
      <ul>
        <li>サイトの運営・品質改善</li>
        <li>不正利用防止</li>
        <li>ユーザー体験の向上</li>
      </ul>

      <h3>5. 個人情報の第三者提供について</h3>
      <p>
        当サイトは、法律に基づく場合を除き、利用者の情報を第三者に提供することはありません。
      </p>

      <h3>6. プライバシーポリシーの変更</h3>
      <p>
        本ポリシーの内容は、必要に応じて変更される場合があります。
        変更後の内容は、本ページに掲載された時点で適用されます。
      </p>

      <h3>7. お問い合わせ</h3>
      <p>
        プライバシーに関するお問い合わせは以下までお願いいたします。<br />
        <a href="mailto:tabinazo@gmail.com">tabinazo@gmail.com</a>
      </p>

      <p style={{ marginTop: 40, fontSize: '0.85rem', opacity: 0.7 }}>
        制定日：2025年
      </p>
    </div>
  );
}
