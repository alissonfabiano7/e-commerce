using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp
{
    public static class ExtensionMethods
    {

		public static List<T> MyCustomJoin<T>(this List<T> first, List<T> second)
		{
			if (first == null)
			{
				return second;
			}
			if (second == null)
			{
				return first;
			}

			return first.Concat(second).ToList();
		}

	}
}
