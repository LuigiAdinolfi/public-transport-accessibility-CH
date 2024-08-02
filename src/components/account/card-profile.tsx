import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

/**
 * Component representing a card displaying user profile.
 * @returns {React.ReactElement} JSX Element
 */
export function CardProfile(): React.ReactElement {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isElectricWheelchair, setIsElectricWheelchair] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  type Checked = DropdownMenuCheckboxItemProps["checked"];

  const [showWalkingDisability, setShowWalkingDisability] =
    useState<Checked>(false);
  const [showVisualImpairment, setShowVisualImpairment] =
    useState<Checked>(false);
  const [showOtherDisability, setShowOtherDisability] =
    useState<Checked>(false);

  const [showMonochrome, setShowMonochrome] = useState<Checked>(false);
  const [showTritanopia, setShowTritanopia] = useState<Checked>(false);
  const [showDeuteranopia, setShowDeuteranopia] = useState<Checked>(false);
  const [showProtanopia, setShowProtanopia] = useState<Checked>(false);

  const handleSwitchDisabilityChange = (
    checked: boolean | ((prevState: boolean) => boolean),
  ) => {
    setIsDisabled(checked);
  };

  const handleSwitchElectricWheelchairChange = (
    checked: boolean | ((prevState: boolean) => boolean),
  ) => {
    setIsElectricWheelchair(checked);
  };

  useEffect(() => {
    if (!isDisabled) {
      setShowWalkingDisability(false);
      setShowVisualImpairment(false);
      setShowOtherDisability(false);
      setIsElectricWheelchair(false); // Optional: also reset wheelchair state
    }
  }, [isDisabled]);

  useEffect(() => {
    if (!showWalkingDisability) {
      setIsElectricWheelchair(false);
    }
  }, [showWalkingDisability]);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleEdit = () => {
    setIsConfirmed(false);
    setIsDisabled(false);
    setShowWalkingDisability(false);
    setShowVisualImpairment(false);
    setShowOtherDisability(false);
    setIsElectricWheelchair(false);
    // Reset other states if needed
  };

  return (
    <Card>
      <CardHeader className="pb-8">
        <CardDescription className="text-sm text-zinc-600 md:text-base">
          Persönliche Angaben
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pb-12">
        <div className="flex justify-between space-x-24">
          <div className="w-full space-y-1">
            <Label className="md:text-base">Vorname</Label>
            <Input
              disabled
              type="text"
              placeholder="Max"
              className="text-base lg:h-11"
            />
          </div>
          <div className="w-full space-y-1">
            <Label className="md:text-base">Nachname</Label>
            <Input
              disabled
              type="text"
              placeholder="Mustermann"
              className="text-base lg:h-11"
            />
          </div>
        </div>
        <div className="flex justify-between space-x-24">
          <div className="w-full space-y-1">
            <Label className="md:text-base">Geburtsdatum</Label>
            <Input
              disabled
              type="text"
              placeholder="30.06.1965"
              className="text-base lg:h-11"
            />
          </div>
          <div className="w-full space-y-1">
            <Label className="md:text-base">Email</Label>
            <Input
              disabled
              type="email"
              placeholder="max.mustermann@beispiel.ch"
              className="text-base lg:h-11"
            />
          </div>
        </div>
        <div className="flex w-full justify-center pt-4">
          <Button className="lg:h-11 lg:w-64" variant="secondary">
            <span className="md:text-base">Angaben bearbeiten</span>
          </Button>
        </div>
        <div className="pt-4">
          <Separator />
        </div>
        <CardDescription className="pt-2 text-zinc-600 md:text-base">
          Profil konfigurieren
        </CardDescription>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-row items-center justify-between space-y-2 rounded-lg border border-zinc-200 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 lg:w-[28rem]">
            <div className="space-y-2">
              <Label className="font-semibold md:text-base">
                Ich bin eine Person mit Behinderung
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="disability"
                onCheckedChange={handleSwitchDisabilityChange}
                disabled={isConfirmed}
              />
            </div>
          </div>
          {isDisabled && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-between lg:h-11 lg:w-[28rem] lg:text-base"
                  disabled={isConfirmed}
                >
                  <span>Art der Behinderung</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="lg:w-[28rem]">
                <DropdownMenuLabel>Art der Behinderung</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  className="lg:h-10 lg:text-sm"
                  checked={showWalkingDisability}
                  onCheckedChange={setShowWalkingDisability}
                  disabled={isConfirmed}
                >
                  Gehbehinderung
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  className="lg:h-10 lg:text-sm"
                  checked={showVisualImpairment}
                  onCheckedChange={setShowVisualImpairment}
                  disabled={isConfirmed}
                >
                  Sehbehinderung
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  className="lg:h-10 lg:text-sm"
                  checked={showOtherDisability}
                  onCheckedChange={setShowOtherDisability}
                  disabled={isConfirmed}
                >
                  Sonstige Behinderung
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {isDisabled && (
          <>
            <div className="flex w-full items-center justify-between">
              {showWalkingDisability && (
                <div className="flex flex-row items-center justify-between space-y-2 rounded-lg border border-zinc-200 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 lg:w-[28rem]">
                  <div className="space-y-2">
                    <Label className="font-semibold md:text-base">
                      Ich benutze einen elektrischen Rollstuhl
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="electricWheelchair"
                      onCheckedChange={handleSwitchElectricWheelchairChange}
                      disabled={isConfirmed}
                    />
                  </div>
                </div>
              )}
              {showVisualImpairment && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-between lg:h-11 lg:w-[28rem] lg:text-base"
                      disabled={isConfirmed}
                    >
                      <span>Art der Sehbehinderung</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="lg:w-[28rem]">
                    <DropdownMenuLabel>
                      Art der Sehbehinderung
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      className="lg:h-10 lg:text-sm"
                      checked={showMonochrome}
                      onCheckedChange={setShowMonochrome}
                      disabled={isConfirmed}
                    >
                      Monochromasie (Unfähigkeit, Farben zu sehen)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      className="lg:h-10 lg:text-sm"
                      checked={showTritanopia}
                      onCheckedChange={setShowTritanopia}
                      disabled={isConfirmed}
                    >
                      Tritanopie (Unfähigkeit, Blau und Gelb zu unterscheiden)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      className="lg:h-10 lg:text-sm"
                      checked={showDeuteranopia}
                      onCheckedChange={setShowDeuteranopia}
                      disabled={isConfirmed}
                    >
                      Deuteranopie (Unfähigkeit, Grün zu sehen)
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      className="lg:h-10 lg:text-sm"
                      checked={showProtanopia}
                      onCheckedChange={setShowProtanopia}
                      disabled={isConfirmed}
                    >
                      Protanopie (Unfähigkeit, Rot wahrzunehmen)
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            {showWalkingDisability && isElectricWheelchair && (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-row items-center justify-between space-y-2 rounded-lg border border-zinc-200 bg-white p-4 text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 lg:w-[28rem]">
                  <div className="space-y-2">
                    <Label className="font-semibold md:text-base">
                      Mein Rollstuhl überschreitet diese Masse nicht: Breite 70
                      cm, Länge 125 cm, Höhe 137 cm
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="wheelchairSize"
                      onCheckedChange={() => {}}
                      disabled={isConfirmed}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div className="flex w-full justify-center pt-4">
          {isConfirmed ? (
            <Button
              className="lg:h-11 lg:w-64"
              variant="secondary"
              onClick={handleEdit}
            >
              <span className="md:text-base">Bearbeiten</span>
            </Button>
          ) : (
            <Button className="lg:h-11 lg:w-64" onClick={handleConfirm}>
              <span className="md:text-base">Bestätigen</span>
            </Button>
          )}
        </div>
        {isConfirmed && (
          <div className="text-center text-zinc-500">
            <p>Deine Auswahl wurde bestätigt</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
