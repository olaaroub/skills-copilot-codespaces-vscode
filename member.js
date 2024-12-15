function skillsMember() {
    var member = this;
    this.skills = {
        javascript: 'proficient',
        php: 'proficient',
        html: 'proficient',
        css: 'proficient',
        python: 'proficient'
    };
    this.getSkill = function(skill) {
        return member.skills[skill] || 'not found';
    };
    this.setSkill = function(skill, level) {
        member.skills[skill] = level;
    };
}