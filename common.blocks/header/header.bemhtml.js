block('header')(
    tag()('h1'),
    content()(function() {
        return [
            {
                block: 'link',
                mix: [{ block: 'header', elem: 'link' }],
                url: "https://github.com/bem/bem-xjst/",
                content: 'BEM-XJST'
            },
            '&nbsp;',
            {
                block: 'link',
                mix: [{ block: 'header', elem: 'link' }],
                url: "https://github.com/bem/bem-xjst/releases/",
                content: '4.2.4'
            },
            ' online demo'
        ];
    })
);