'use strict';

Entry.Testino = {
    id: 'FF.FF',
    name: 'Testino',
    url: 'http://www.my-company.org/',
    imageName: 'testino.png', //thumbnail. 신규등록시 images/hw, images/hardware 에 이미지가 있어야합니다.
    title: {
        "ko": '테스트이노',
        "en": 'testino'
    },
    setZero: function() {
        // 엔트리 실행이 정지되었을 때 보낼 신호(reset 명령을 보냄)
        // 2번부터 13번 포트를 0으로 초기화
        for(let i = 2 ; i <= 13 ; i++) {
            Entry.hw.sendQueue.PORT[i] = 0;
        }

        Entry.hw.update(); // 하드웨어에 정보를 보냄
    },
}

Entry.Testino.blockMenuBlocks = [
    "testino_on_digital_value", // 작성한 블록의 이름을 추가합니다.
    "testino_off_digital_value"
];

Entry.Testino.setLanguage = () => {
    return {
        ko: {
            template: {
                testino_on_digital_value: '디지털 핀 %1 번을 켜기',
                testino_off_digital_value: '디지털 핀 %1 번을 끄기'
            }
        },
        en: {
            template: {
                testino_on_digital_value: 'turn on digital pin %1',
                testino_off_digital_value: 'turn off digital pin %1'
            }
        }
    }
}

Entry.Testino.getBlocks = () => {
    return {
        testino_on_digital_value: { // 블록 이름
            color: EntryStatic.colorSet.block.default.HARDWARE, // 블록 색상. 상수변수로 고정입니다.
            outerLine: EntryStatic.colorSet.block.darken.HARDWARE,
            skeleton: 'basic',
            params: [ // 입력되는 파라미터의 속성 정의
                {
                    type: 'Block',
                    accept: 'string', // 숫자만 들어가도 string입니다. 엔트리에서는 숫자와 문자열을 구분하지 않습니다.
                },
            ],
            def: {
                params: [ // 각 파라미터의 기본값
                    {
                        type: 'number',
                        params: [5],
                    },
                ],
                type: 'testino_on_digital_value', // 블록 상속과 관련된 값입니다. 블록명과 동일하게 작성합니다.
            },
            paramsKeyMap: { // 실제 블록의 로직인 func에서 key값으로 사용할 파라미터의 인덱스 번호
                PORT: 0,
            },
            events: {},
            class: 'TestinoBlock', // 블록을 묶는 그룹 이름. 이 값이 다르면 사이에 가로줄이 생깁니다.
            //isNotFor: ['Testino'], // 값으로 지정된 하드웨어가 연결된 경우만 블록을 표시합니다. 기본 명세의 name값과 동일해야합니다.
            /*
             * func는 블록의 핵심 로직을 담당합니다.
             * 이 부분에서 하드웨어로 보낼 값을 지정하거나, 블록이 값을 반환하는 등의 행위가 이루어집니다.
             * 이 로직을 수정하여 블록이 다양한 일을 하게 할 수 있습니다.
             */
            func: async (sprite, script) => {
                // paramsKeyMap에서 0번 인덱스 파라미터의 값을 'PORT'라는 key값으로 사용하게 지정했습니다.
                const portNumber = await script.getNumberValue('PORT');
                Entry.hw.sendQueue.PORT[portNumber] = 1
                // 값을 반환할 수 있습니다.
            },
        },
    }
}



module.exports = Entry.Testino;