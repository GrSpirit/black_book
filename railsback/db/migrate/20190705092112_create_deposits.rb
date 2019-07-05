class CreateDeposits < ActiveRecord::Migration[5.2]
  def change
    create_table :deposits do |t|
      t.string :bank
      t.date :date_start
      t.date :date_end
      t.decimal :amount
      t.decimal :percent

      t.timestamps
    end
  end
end
