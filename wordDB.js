function wordToRubyInnerHTML( wordFromWords ){

  var innerHTML = '';

  const wordProperties = words[wordFromWords];
  const word = wordProperties.word;
  const furigana = wordProperties.furigana;
  const translation = wordProperties.translation;

  if( !Array.isArray(word) ){
    // <ruby>私<rt>わたし</rt><rtc class='under'>I</rtc></ruby>
    // <ja-word>i-watashi</ja-word>

    innerHTML = word + '<rt>' + furigana + '</rt><rtc class=\'under\'>' + translation + '</rtc>';

  }else{
    // <ruby class='yellow'><ruby>見<rt>み</rt></ruby>る<rtc class='under'>see</rtc></ruby>
    // <ja-word>see-miru</ja-word>

    for( const [ i, wordPart ] of word.entries() ){

      const furiganaPart = furigana[i] ? furigana[i] : '';

      innerHTML += '<ruby>' + wordPart + '<rt>' + furiganaPart + '</rt></ruby>';

    }

    innerHTML += '<rtc class=\'under\'>' + translation + '</rtc>';


  }

  return innerHTML;

}

class JaWord extends HTMLElement {

  constructor(){ super(); }

  connectedCallback(){

    const shadow = this.attachShadow( { mode: 'open' } );

    const ruby = document.createElement( 'ruby' );
    ruby.innerHTML = wordToRubyInnerHTML( this.innerHTML );

    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '../../template.css');

    shadow.appendChild( linkElem );
    shadow.appendChild( ruby );

  }

}
customElements.define( 'ja-word', JaWord );

class JaWrapper extends HTMLElement {

  constructor(){ super(); }

  connectedCallback(){

    this.class = 'ja-wrap';

  }

}
customElements.define( 'ja-wrapper', JaWrapper );

class JaSentence extends HTMLElement {

  constructor(){ super(); }

  connectedCallback(){

    const shadow = this.attachShadow( { mode: 'open' } );

    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '../../template.css');

    const jaWrapper = document.createElement( 'ja-wrapper' );
    const sentenceParts = this.innerHTML.trim().split( ' ' );

    sentenceParts.forEach( ( part ) => {

      const word = document.createElement( 'ruby' );
      var style = null;

      if( part.indexOf( '\\y' ) != -1 ){

        word.className = 'yellow';
        part = part.replace( '\\y', '' );

      };

      word.innerHTML = part in words ? wordToRubyInnerHTML( part ) : part;

      jaWrapper.append( word );
      jaWrapper.innerHTML = jaWrapper.innerHTML + ' ';

    } );

    shadow.appendChild( linkElem );
    shadow.appendChild( jaWrapper );

  }

}
customElements.define( 'ja-sentence', JaSentence );

class JaExample extends HTMLElement {
  
  constructor(){ super(); }

  connectedCallback(){
    
    this.className = 'hl-ja-like';

    const shadow = this.attachShadow( { mode: 'open' } );

    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '../../template.css');

    const div = document.createElement( 'div' );

    window.onload = () => { div.innerHTML = this.innerHTML; }

    shadow.appendChild( linkElem );
    shadow.appendChild( div );

  }

}
customElements.define( 'ja-example', JaExample );

// <span class='ja-wrap'> <ruby>私<rt>わたし</rt><rtc class='under'>I</rtc></ruby> は <ruby>猫<rt>ねこ</rt><rtc class='under'>cat</rtc></ruby> を <ruby class='yellow'><ruby>見<rt>み</rt></ruby>る<rtc class='under'>see</rtc></ruby> </span>
// <ja-wrapper> <ja-word>i-watashi</ja-word> は <ja-word>cat-neko</ja-word> を <ja-word class='yellow'>see-miru</ja-word> </ja-wrapper>
// <ja-sentence> i-watashi は cat-neko を \ysee-miru </ja-sentence>

// <ja-example>
//   <ja-sentence> i-watashi は cat-neko を \ysee-miru </ja-sentence> <br>
//   I <yellow>see</yellow> a cat
// </ja-example>

const words = {

  'i-watashi': {

    translation: 'I',
    furigana: 'わたし',
    word: '私'

  },

  'i-watakushi': {

    translation: 'i',
    furigana: 'わたくし',
    word: '私'

  },

  'this-kono': {

    translation: 'this',
    furigana: null,
    word: 'この'

  },

  'this-kore': {

    translation: 'this',
    furigana: null,
    word: 'これ'

  },

  'see-miru': {

    translation: 'see',
    furigana: [ 'み', null ],
    word: [ '見', 'る' ]

  },

  'see-mimasu': {

    translation: 'see',
    furigana: [ 'み', null ],
    word: [ '見', 'ます' ]

  },

  'cat-neko': {

    translation: 'cat',
    furigana: 'ねこ',
    word: '猫'

  },

  'go-iku': {

    translation: 'go',
    furigana: ['い', null],
    word: ['行', 'く']

  }

}