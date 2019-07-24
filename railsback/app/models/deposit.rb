class Deposit < ApplicationRecord
  validates :bank, presence: true, length: { maximum: 50 }
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :percent, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 100 }
  validates :date_start, :date_end, presence: true
end
