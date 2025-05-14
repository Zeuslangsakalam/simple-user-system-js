document.addEventListener('DOMContentLoaded', function () {
    const userRoleSelect = document.getElementById('userRole');
    const touchValInput = document.getElementById('touchVal');
    const touchValLabel = document.getElementById('touchValLabel');

    if (!userRoleSelect || !touchValInput || !touchValLabel) {
        console.error("必需的元素未找到，请检查HTML结构和ID。");
        return;
    }

    function updateTouchField() {
        const selectedValue = userRoleSelect.value;

        let labelText = '';
        let placeholderText = '';
        switch (selectedValue) {
            case '1': // 管理员
                labelText = 'ID：';
                placeholderText = '输入ID';
                break;
            case '2': // 教师
                labelText = '工号：';
                placeholderText = '输入工号';
                break;
            case '3': // 学生
                labelText = '学号：';
                placeholderText = '输入学号';
                break;
            case '4': // 职工
                labelText = '工号：';
                placeholderText = '输入工号';
                break;
            default: // 默认或未知情况
                labelText = '学号：';
                placeholderText = '输入学号';
                break;
        }

        touchValLabel.textContent = labelText;
        touchValInput.placeholder = placeholderText;
    }

    userRoleSelect.addEventListener('change', updateTouchField);

    updateTouchField();
});