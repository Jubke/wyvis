class AddAttachmentJavascriptToUsecases < ActiveRecord::Migration
  def self.up
    change_table :usecases do |t|
      t.attachment :javascript
    end
  end

  def self.down
    remove_attachment :usecases, :javascript
  end
end
