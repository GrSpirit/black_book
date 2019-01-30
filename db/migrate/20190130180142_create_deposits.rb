class CreateDeposits < ActiveRecord::Migration[5.2]
  def change
    create_table :deposits do |t|
      t.string :bank
      t.date :start_date
      t.date :end_date
      t.decimal :amount
      t.decimal :percent

      t.timestamps
    end
  end
end
