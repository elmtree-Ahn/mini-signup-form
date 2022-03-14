// 1. autofocus

const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')
window.addEventListener('load', () => $id.focus())

// 2.유효성 검사 로직

const $pw = document.getElementById('pw')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheck = document.getElementById('pw-check')
const $pwCheckMsg = document.getElementById('pw-check-msg')

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}')

const ID_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '5~20자의 영문 소문자, 숫자와 특수기호(_)(-)만 사용 가능합니다.',
}
const PW_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    different: '비밀번호가 일치하지 않습니다.',
}

const checkIdRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return ID_REGEX.test(value) ? true : 'invalid'
    }
}
const checkIdValidation = (value) => {
    const isValidId = checkIdRegex(value)
    // 3. 커스텀 에러 메시지
    if (isValidId !== true) {
        $id.classList.add('border-red-600')
        $idMsg.innerText = ID_ERROR_MSG[isValidId]
    } else {
        $id.classList.remove('border-red-600')
        $idMsg.innerText = ''
    }

    return isValidId
}

$id.addEventListener('focusout', () => checkIdValidation($id.value))

const checkPwRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return PW_REGEX.test(value) ? true : 'invalid'
    }
}
const checkPwValidation = (value) => {
    // const isValidPw = PW_REGEX.test(value)
    // console.log(isValidPw)
    let isValidPw = checkPwRegex(value)
    // 3. 커스텀 메세지
    if (isValidPw !== true) {
        $pw.classList.add('border-red-600')
        $pwMsg.innerText = PW_ERROR_MSG[isValidPw]
    } else {
        $pw.classList.remove('border-red-600')
        $pwMsg.innerText = ''
    }
    return isValidPw
}

$pw.addEventListener('focusout', () => checkPwValidation($pw.value))
const checkPwCheckRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return value === $pw.value ? true : 'different'
    }
}
const checkPwCheckValidation = (value) => {
    // const isValidPwCheck = value === $pw.value
    let isValidPwCheck = checkPwCheckRegex(value)

    if (isValidPwCheck !== true) {
        $pwCheck.classList.add('border-red-600')
        $pwCheckMsg.innerText = PW_ERROR_MSG[isValidPwCheck]
    } else {
        $pwCheck.classList.remove('border-red-600')
        $pwCheckMsg.innerText = ''
    }

    return isValidPwCheck
}

$pwCheck.addEventListener('focusout', () =>
    checkPwCheckValidation($pwCheck.value)
)

// 4. 입력 확인 모달 창 구현
const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')

const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')

const $cancelBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')

$submit.addEventListener('click', (event) => {
    event.preventDefault()
    const isValidForm =
        checkIdValidation($id.value) === true &&
        checkPwValidation($pw.value) === true &&
        checkPwCheckValidation($pwCheck.value) === true
    if (isValidForm) {
        $confirmId.innerText = $id.value
        $confirmPw.innerText = $pw.value
        $modal.showModal()
    }
})

$cancelBtn.addEventListener('click', () => {
    $modal.close()
})
$approveBtn.addEventListener('click', () => {
    alert('가입되었습니다 🥳')
    $modal.close()
    location.reload()
})

// 5. 폰트 사이즈 조절 버튼
const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')
const $html = document.documentElement

const getHtmlFontSize = () => {
    return parseFloat(
        window.getComputedStyle(document.documentElement).fontSize
    )
}

$increaseFontBtn.addEventListener('click', () => {
    const nextFontSize = getHtmlFontSize() + 1
    $html.style.fontSize = nextFontSize
    if (nextFontSize >= 20) {
        $increaseFontBtn.disabled = true
    }
    if (nextFontSize > 12) {
        $decreaseFontBtn.disabled = false
    }
})
$decreaseFontBtn.addEventListener('click', () => {
    const nextFontSize = getHtmlFontSize() - 1
    $html.style.fontSize = nextFontSize
    if (nextFontSize <= 12) {
        $decreaseFontBtn.disabled = true
    }
    if (nextFontSize < 20) {
        $increaseFontBtn.disabled = false
    }
})
