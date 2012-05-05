cookie.empty(); // Make sure no cookies exist when the test begins.

module('cookie.set')

test('(key, value)', function () {
	cookie.set('a', '1')
	equal(cookie.get('a'), cookie.get('a'));
});

test('(obj)', function () {
	cookie.set({
		b: '2',
		c: '3'
	});
	deepEqual([cookie.get('b'), cookie.get('c')], ['2', '3']);
});

module('cookie.get');

test('(key)', function () {
	equal(cookie.get('a'), '1');
});

test('key, fallback', function () {
	equal(cookie.get('a', 'fallback'), '1', 'With known key.');
	equal(cookie.get('unknownKey', 'fallback'), 'fallback', 'With unknown key.');
});


test('([key1, key2])', function () {
	deepEqual(cookie.get(['a', 'b']), {
		a: '1',
		b: '2'
	});
});

test('([key1, key2], fallback)', function () {
	deepEqual(cookie.get(['a', 'b']), {
		a: '1',
		b: '2'
	}, 'With known keys.');
	deepEqual(cookie.get(['a', 'unknownKey'], 'fallback'), {
		a: '1',
		unknownKey: 'fallback'
	}, 'With unknown keys.');
});

module('cookie');

test('(key)', function () {
	equal(cookie('a'), '1');
});

test('key, fallback', function () {
	equal(cookie('a', 'fallback'), '1', 'With known key.');
	equal(cookie('unknownKey', 'fallback'), 'fallback', 'With unknown key.');
});


test('([key1, key2])', function () {
	deepEqual(cookie(['a', 'b']), {
		a: '1',
		b: '2'
	});
});

test('([key1, key2], fallback)', function () {
	deepEqual(cookie(['a', 'b']), {
		a: '1',
		b: '2'
	}, 'With known keys.');
	deepEqual(cookie(['a', 'unknownKey'], 'fallback'), {
		a: '1',
		unknownKey: 'fallback'
	}, 'With unknown keys.');
});

module('cookie.remove');

test('(key)', function () {
	cookie.remove('a');
	equal(cookie.get('a'), undefined);
});

test('(key1, key2)', function () {
	cookie.remove('b', 'c');
	deepEqual(cookie.get(['b', 'c']), {
		b: undefined,
		c: undefined
	});
});

test('([key1, key2])', function () {

	// No more cookies are left at this point, so new ones are created.
	cookie.set({
		d: '4',
		e: '5',
		f: '6',
		g: '7'
	});

	cookie.remove(['d', 'e']);
	deepEqual(cookie.get(['d', 'e']), {
		d: undefined,
		e: undefined
	});
})

/*

The tests of the two following modules will fail on http://js-coder.github.com/cookie.js/tests/ 
because GitHub adds some cookies for the statistics that cannot be removed.
If you run the tests locally, you can uncomment these two modules. They should just run fine in a
clean environment.

module('cookie.empty');

test('()', function () {
	cookie.empty();
	deepEqual(cookie.all(), {});
});

module('cookie.all');

test('()', function () {
	cookie.set({
		h: '8',
		i: '9'
	});
	deepEqual(cookie.all(), {
		h: '8',
		i: '9'
	});
});

*/