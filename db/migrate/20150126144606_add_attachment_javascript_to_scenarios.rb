class AddAttachmentJavascriptToScenarios < ActiveRecord::Migration
  def self.up
    change_table :scenarios do |t|
      t.attachment :javascript
    end
  end

  def self.down
    remove_attachment :scenarios, :javascript
  end
end
