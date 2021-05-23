const secondsInDay = 24 * 60 * 60
const millisecondsInDay = secondsInDay * 1000;
const missingLeapYearDay = millisecondsInDay

export function getExcelEpoch()
{
	const excelEpoch = new Date(Date.UTC(1899, 11, 31))

	return excelEpoch
}

export function getExcelDelta()
{
	const excelEpochTs = getExcelEpoch().getTime();

	const excelDelta = excelEpochTs - missingLeapYearDay

	return excelDelta
}

export type IExcelDateNumberInput = string | number;

export function validDateNumber(excelDateNumber: number): excelDateNumber is number
{
	return !(typeof excelDateNumber !== 'number' || !Number.isFinite(excelDateNumber) || Number.isNaN(excelDateNumber) || excelDateNumber <= 0)
}

export function excelDateNumber(excelDate: IExcelDateNumberInput): number
{
	// @ts-ignore
	const value = Number.parseFloat(excelDate, 10)

	if (validDateNumber(value))
	{
		return value
	}
}

/**
 * Convert input to a number
 */
export function excelDateNumberToTs(excelDate: IExcelDateNumberInput)
{
	const value = excelDateNumber(excelDate)

	if (typeof value === 'number')
	{
		//const excelDateSeconds = value * secondsInDay;
		const excelDateMilliseconds = value * millisecondsInDay;

		return excelDateMilliseconds
	}
}

export function ts2excel(milliseconds: number)
{
	const excelDelta = getExcelDelta();

	return milliseconds - excelDelta;
}

export function date2excel(date: Date)
{
	return ts2excel(date.getTime());
}

/**
 * Convert input to JS Date
 * Details here (mostly in comments): https://gist.github.com/christopherscott/2782634
 *
 * @link https://gist.github.com/christopherscott/2782634
 */
export function exceldateTs<T = number>(excelDate: IExcelDateNumberInput,
	done = (err: Error, unixTs?: number): T =>
	{
		if (err) throw err
		return unixTs as any
	},
)
{
	if (!excelDate)
	{
		return done(new Error('No first argument provided, nothing to convert.'))
	}

	try
	{
		const excelTs = excelDateNumberToTs(excelDate);

		if (typeof excelTs !== 'number')
		{
			return done(new Error('First argument could not be parsed.'))
		}

		const excelDelta = getExcelDelta();

		const unixTs = excelTs + excelDelta

		return done(null, unixTs)
	}
	catch (e)
	{
		return done(e)
	}
}

/**
 * Takes an Excel timestamp (as a number or string) and returns a corresponding Date object
 */
export function exceldate<T = Date>(excelDate: IExcelDateNumberInput,
	done = (err: Error, res?: Date): T =>
	{
		if (err) throw err
		return res as any
	},
)
{
	return exceldateTs(excelDate, (err: Error, unixTs?: number) => {
		if (err)
		{
			return done(err)
		}
		else
		{
			try
			{
				const jsDate = new Date(unixTs)
				return done(null, jsDate)
			}
			catch (e)
			{
				return done(e)
			}
		}
	})
}

export default exceldate
