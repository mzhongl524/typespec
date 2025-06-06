// <auto-generated/>

#nullable disable

using System;

namespace SampleTypeSpec
{
    internal static partial class IntFixedEnumExtensions
    {
        /// <param name="value"> The value to deserialize. </param>
        public static IntFixedEnum ToIntFixedEnum(this int value)
        {
            if (value == 1)
            {
                return IntFixedEnum.One;
            }
            if (value == 2)
            {
                return IntFixedEnum.Two;
            }
            if (value == 4)
            {
                return IntFixedEnum.Four;
            }
            throw new ArgumentOutOfRangeException(nameof(value), value, "Unknown IntFixedEnum value.");
        }
    }
}
