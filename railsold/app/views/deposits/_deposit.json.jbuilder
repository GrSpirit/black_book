json.extract! deposit, :id, :bank, :date_start, :date_end, :amount, :percent, :created_at, :updated_at
json.url deposit_url(deposit, format: :json)
