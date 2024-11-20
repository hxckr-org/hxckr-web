const ActivityCalendar = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return (
      <div className="bg-white rounded-lg border border-[#DBE2E8]">
        <div className="flex justify-between items-center p-6 bg-[#F5F5F5] rounded-t-lg">
          <h2 className="text-xl font-semibold text-[#313233]">Activity Calendar</h2>
          <select className="border rounded-lg px-3 py-2 text-[#5A5A5A] bg-white font-normal">
            <option>2024</option>
          </select>
        </div>
        <div className="p-6">
          {/* Months row */}
          <div className="flex justify-between mb-2 text-[#5A5A5A] text-sm">
            {months.map((month) => (
              <div key={month}>{month}</div>
            ))}
          </div>
  
          {/* Activity grid */}
          <div 
            className="w-full"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(52, minmax(0, 1fr))',
              gap: '2px',
              aspectRatio: '7/1' // This helps maintain the grid's shape
            }}
          >
            {[...Array(364)].map((_, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-sm ${
                  i === 150 ? 'bg-green-500' : 'bg-[#F5F5F5]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

export default ActivityCalendar;