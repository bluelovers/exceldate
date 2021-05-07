
export function exceldateTs<T = number>(excelDate: string | number,
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
		// Convert input to a number
		// @ts-ignore
		const excelDateNumber = Number.parseFloat(excelDate, 10)
		if (Number.isNaN(excelDateNumber))
		{
			return done(new Error('First argument could not be parsed.'))
		}

		// Convert input to JS Date
		// Details here (mostly in comments): https://gist.github.com/christopherscott/2782634
		const secondsInDay = 24 * 60 * 60
		const excelEpoch = new Date(Date.UTC(1899, 11, 31))
		const excelEpochTs = excelEpoch.getTime()
		const missingLeapYearDay = secondsInDay * 1000

		const excelDelta = excelEpochTs - missingLeapYearDay
		const excelTs = excelDateNumber * secondsInDay * 1000
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
export function exceldate<T = Date>(excelDate: string | number,
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
