---
category: 2025
date: 2025-mm-dd
seo:
    title: SEO最適化済みのタイトル
    description: ページ内容を正確に反映した、SEO最適化された説明文（155文字以内を推奨）。

labels:
    - 一般
markdown:
    editPage:
        hide: true
---
# SEO最適化済みのタイトル


ブログ記事の下書きに向けて、最初の一歩を踏み出しましたね！ この記事の構成を整理するための出発点として、このテンプレートを活用してください。

<!-- BREAK -->


詳しいガイドラインや例については、[ブログ記事を投稿する](https://xrpl.org/resources/contribute-blog/)をご覧ください。

NOTE: 現在、ブログ記事は英語のみで提供されており、翻訳はまだ行われていません。

## セクション: 便利なリファレンス

すぐに執筆を始められるように、ブログ記事でよく使われる構文のガイドをご用意しました。執筆プロセスを効率化するのに最適です。

**タイトル**

ブログ記事のタイトルや見出しにはタイトルケース（英語の各単語の頭文字を大文字）を使用してください。 

SEOに最適化されたタイトルを選びましょう。 

タイトルは50文字以内に収め、メタ情報の `seo -> title` フィールドと一致させることを推奨します。

**リンク**

内部リンクを含めるには、相対パスを使用します。  例えば、ドキュメントへの貢献 トピックへのリンクを作成するには以下の構文を使用します。

```
[ドキュメントへの貢献](../resources/contribute-documentation/index.md).
```

外部リンクを含めるには、相対パスではなく絶対URLを使用してください。以下の例をご覧ください。

```
[ドキュメントへの貢献](https://xrpl.org/resources/contribute-documentation).
```

**リスト**

順不同リストを含めるには、以下の構文を使用してください。

- 項目 1
- 項目 2

順序付きリストを含めるには、以下の構文を使用してください。

1. リスト項目 1
2. リスト項目 2


### サブセクション: ブログ記事へ画像を埋め込む方法

画像を含めるには、以下の構文を使用してください。

```
![image_description](/blog/img/my_image.png)
```

画像ファイルは `/blog/img` ディレクトリに保存することを推奨します。

例えば、 `![XRPL Developer Portal](/blog/img/docs-iav3/xrpl-docs-home.png)` と記述すると、以下のように表示されます。

![XRPL Developer Portal](/blog/img/docs-iav3/xrpl-docs-home.png)

### サブセクション: ブログ記事へ動画を埋め込む方法

動画の埋め込み方法については、[ドキュメントへの貢献](https://xrpl.org/resources/contribute-documentation#videos) の該当セクションをご覧ください。
