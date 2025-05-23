export function formatDateToBrazilian(date: Date | string | null | undefined): string {
    try {
      // Handle null or undefined
      if (date === null || date === undefined) {
        return '';
      }
      
      // Convert string to Date object if necessary
      const dateObject = typeof date === 'string' ? new Date(date) : date;
      
      // Check if the date is valid
      if (isNaN(dateObject.getTime())) {
        return '';
      }
      
      // Get day, month, and year with leading zeros
      const day = String(dateObject.getDate() + 1).padStart(2, '0');
      const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = dateObject.getFullYear();
      
      // Return formatted date
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  }