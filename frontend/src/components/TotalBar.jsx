function TotalBar({ total }) {
  return (
    <div className="text-lg font-semibold mb-4">
      Total: ₹{(total / 100).toFixed(2)}
    </div>
  )
}

export default TotalBar