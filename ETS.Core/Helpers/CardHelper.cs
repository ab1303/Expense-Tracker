using System;
using System.Text.RegularExpressions;

namespace UGC.Core.Helpers
{
    public class CardHelper
    {
        /// <summary>
        /// Performs a digit validation check on the credit card number using the "Luhn / Mod 10" method.
        /// </summary>     
        public static bool IsValidCreditCardNumber(string cardNumber, string cardType = null)
        {

            if (!string.IsNullOrWhiteSpace(cardType))
            {
                var regExp = string.Empty;

                switch (cardType.ToUpper())
                {
                    case "VISA":
                        regExp = "/^4[0-9]{12}(?:[0-9]{3})?$/";
                        break;
                    case "MASTERCARD":
                        regExp = "/^5[1-5][0-9]{14}$/";
                        break;
                    case "DISCOVER":
                        regExp = "^6(?:011|5[0-9]{2})[0-9]{12}$/";
                        break;
                    case "AMERICANEXPRESS":
                        regExp = "/^3[47][0-9]{13}$/";
                        break;
                    case "DINERSCLUB":
                        regExp = "^3(?:0[0-5]|[68][0-9])[0-9]{11}$/";
                        break;
                }

                if (!Regex.IsMatch(cardNumber, regExp))
                    return false;
            }

            if (cardNumber == null || cardNumber.Length < 15)
                return false;

            var tempNo = cardNumber.Split('-');
            cardNumber = string.Join("", tempNo);

            var checksum = 0;
            for (var i = (2 - (cardNumber.Length % 2)); i <= cardNumber.Length; i += 2)
            {
                checksum += Convert.ToInt32(cardNumber[i - 1].ToString());
            }

            for (var i = (cardNumber.Length % 2) + 1; i < cardNumber.Length; i += 2)
            {
                var digit = Convert.ToInt32(cardNumber[i - 1].ToString()) * 2;
                if (digit < 10)
                {
                    checksum += digit;
                }
                else
                {
                    checksum += (digit - 9);
                }
            }

            if ((checksum % 10) == 0)
                return true;
            else
                return false;
        }

        public static string GetMaskedCardNumber(string cardNumber, string mask = null)
        {
            var defaultMaskedNumber = (string.IsNullOrWhiteSpace(cardNumber)
                        ? string.Empty
                        : (cardNumber.Length >= 15
                            ? string.Format("{0}{1}{2}", cardNumber.Substring(0, 6), "*".PadLeft(cardNumber.Length - 9, '*'), cardNumber.Substring(cardNumber.Length - 3))
                            : cardNumber));
            if (mask == null)
                return defaultMaskedNumber;

            try
            {
                var maskedArray = mask.ToCharArray();
                var cardNumberArray = cardNumber.ToCharArray();
                var maskedCardNumber = new char[maskedArray.Length];

                var jump = 0;
                for (var index = 0; index < maskedArray.Length; index++)
                {
                    var maskedChar = maskedArray[index]; //hide                
                    switch (maskedChar)
                    {
                        case 'X':
                            maskedCardNumber[index] = '*';
                            break;
                        case 'N':
                            if ((index - jump) >= cardNumberArray.Length)
                                maskedCardNumber[index] = ' ';
                            else
                                maskedCardNumber[index] = cardNumberArray[index - jump];
                            break;
                        default:
                            jump++;
                            maskedCardNumber[index] = maskedChar;
                            break;
                    }

                }

                return new string(maskedCardNumber);
            }
            catch (Exception)
            {

                return defaultMaskedNumber;
            }
        }
    }
}
