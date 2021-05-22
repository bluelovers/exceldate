// @ts-nocheck

import exceldate from '.';

describe('exceldate', () =>
{
	it('should return the correct date', () =>
	{
		expect(exceldate(42510).toISOString()).toEqual('2016-05-20T00:00:00.000Z')
		expect(exceldate('42510').toISOString()).toEqual('2016-05-20T00:00:00.000Z')
		expect(exceldate(1).toISOString()).toEqual('1899-12-31T00:00:00.000Z')
		expect(exceldate('1').toISOString()).toEqual('1899-12-31T00:00:00.000Z')
		expect(exceldate(2).toISOString()).toEqual('1900-01-01T00:00:00.000Z')
		expect(exceldate('2').toISOString()).toEqual('1900-01-01T00:00:00.000Z')
		expect(exceldate(4242.4242).toISOString()).toEqual('1911-08-12T10:10:50.880Z')
		expect(exceldate('4242.4242').toISOString()).toEqual('1911-08-12T10:10:50.880Z')
		expect(exceldate(42738.22626859954).toISOString()).toEqual('2017-01-03T05:25:49.607Z')
		expect(exceldate('42738.22626859954').toISOString()).toEqual('2017-01-03T05:25:49.607Z')
	})

	it('should return the correct date via callbacks', () =>
	{
		exceldate(42510, (err, res) =>
		{
			expect(res.toISOString()).toEqual('2016-05-20T00:00:00.000Z')
		})
		exceldate('42510', (err, res) =>
		{
			expect(res.toISOString()).toEqual('2016-05-20T00:00:00.000Z')
		})
		exceldate(1, (err, res) =>
		{
			expect(res.toISOString()).toEqual('1899-12-31T00:00:00.000Z')
		})
		exceldate('1', (err, res) =>
		{
			expect(res.toISOString()).toEqual('1899-12-31T00:00:00.000Z')
		})
		exceldate(2, (err, res) =>
		{
			expect(res.toISOString()).toEqual('1900-01-01T00:00:00.000Z')
		})
		exceldate('2', (err, res) =>
		{
			expect(res.toISOString()).toEqual('1900-01-01T00:00:00.000Z')
		})
		exceldate(4242.4242, (err, res) =>
		{
			expect(res.toISOString()).toEqual('1911-08-12T10:10:50.880Z')
		})
		exceldate('4242.4242', (err, res) =>
		{
			expect(res.toISOString()).toEqual('1911-08-12T10:10:50.880Z')
		})
		exceldate(42738.22626859954, (err, res) =>
		{
			expect(res.toISOString()).toEqual('2017-01-03T05:25:49.607Z')
		})
		exceldate('42738.22626859954', (err, res) =>
		{
			expect(res.toISOString()).toEqual('2017-01-03T05:25:49.607Z')
		})

		expect.assertions(10);
	})

	it('should throw an error for invalid inputs', () =>
	{
		expect(() => exceldate('foo')).toThrowErrorMatchingSnapshot()
		expect(() => exceldate(false)).toThrowErrorMatchingSnapshot()
		expect(() => exceldate()).toThrowErrorMatchingSnapshot()
	})

	it('should return errors for invalid inputs via callback', () =>
	{
		exceldate('foo', (err, res) =>
		{
			expect(res).toBeUndefined()
			expect(err.toString()).toEqual('Error: First argument could not be parsed.')
		})

		exceldate(null, (err, res) =>
		{
			expect(res).toBeUndefined()
			expect(err.toString()).toEqual('Error: No first argument provided, nothing to convert.')
		})

		expect.assertions(4);
	})
})
