var assert = require('assert'),
    Buffer = require('safer-buffer').Buffer,
    iconv = require(__dirname+'/../');

describe("CESU-8 codec", function() {
    it("encodes correctly", function() {
        assert.equal(iconv.encode("E", "cesu8").toString('hex'), "45");
        assert.equal(iconv.encode("ยข", "cesu8").toString('hex'), "c2a2");
        assert.equal(iconv.encode("ศ", "cesu8").toString('hex'), "c885");
        assert.equal(iconv.encode("โฌ", "cesu8").toString('hex'), "e282ac");
        assert.equal(iconv.encode("๐", "cesu8").toString('hex'), "eda081edb080");
        assert.equal(iconv.encode("๐ฑ", "cesu8").toString('hex'), "eda0bdedb8b1");
        assert.equal(iconv.encode("a๐ฑa", "cesu8").toString('hex'), "61eda0bdedb8b161");
        assert.equal(iconv.encode("๐ฑ๐ฑ", "cesu8").toString('hex'), "eda0bdedb8b1eda0bdedb8b1");
    });
    it("decodes correctly", function() {
        assert.equal(iconv.decode(Buffer.from("45", 'hex'), "cesu8"), "E");
        assert.equal(iconv.decode(Buffer.from("c2a2", 'hex'), "cesu8"), "ยข");
        assert.equal(iconv.decode(Buffer.from("c885", 'hex'), "cesu8"), "ศ");
        assert.equal(iconv.decode(Buffer.from("e282ac", 'hex'), "cesu8"), "โฌ");
        assert.equal(iconv.decode(Buffer.from("eda081edb080", 'hex'), "cesu8"), "๐");
        assert.equal(iconv.decode(Buffer.from("eda0bdedb8b1", 'hex'), "cesu8"), "๐ฑ");
    });
});
