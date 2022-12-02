/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./*.html'],
    media: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: {
                'free-money': "url('./src/img/annonceurs/free.png')",
            },
            width: {
                '1/13': '7.69230769%',
                '2/13': '15.3846153%',
                '3/13': '23.0769230%',
                '4/13': '30.769230%',
                '5/13': '38.461538%',
                '6/13': '46.153846%',
                '7/13': '53.846153%',
                '8/13': '61.538461%',
                '9/13': '69.230769%',
                '10/13': '76.923076%',
                '11/13': '84.615384%',
                '12/13': '92.30769%',
                '120': '120px',
                '1/8': '12.500%',
                '2/8': '25.000%',
                '3/8': '37.500%',
                '4/8': '50.000%',
                '5/8': '62.500%',
                '6/8': '75.000%',
                '7/8': '87.500%',
            },
            gridColumn: {
                'span-16': 'span 13 / span 13',
            },
            zIndex: {
                '100': '100',
            },
        },


    },
    variants: {
        extend: {
            backgroundColor: ['active'],
            fontSize: ['active', 'hover'],
            width: ['active', 'hover'],
        },
    },
    plugins: [],
}