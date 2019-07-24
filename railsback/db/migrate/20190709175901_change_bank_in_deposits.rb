class ChangeBankInDeposits < ActiveRecord::Migration[5.2]
  def change
    change_column :deposits, :bank, :string, null: false
    change_column :deposits, :date_start, :date, null: false
    change_column :deposits, :date_end, :date, null: false
    change_column :deposits, :amount, :decimal, null: false
    change_column :deposits, :percent, :decimal, null: false
  end
end
