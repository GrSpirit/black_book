class Deposit < ApplicationRecord
  validates :bank, presence: true, length: { maximum: 255 }
  validates :date_start, presence: true
  validates :date_end, presence: true
  validates :amount, presence: true
  validates :percent, presence: true
end
